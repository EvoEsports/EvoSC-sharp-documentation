# Localization
EvoSC# provides a general system for localizing your modules. It leverages the [ResourceManager](https://learn.microsoft.com/en-us/dotnet/api/system.resources.resourcemanager?view=net-7.0) to provide an easy-to-use but powerful interface for all your localization needs.

::: tip
You can find the project for translating EvoSC# core and internal modules here: https://crowdin.com/project/evosc-sharp

We welcome any contributions!
:::

## Getting Started
To get started with localizing your module, begin by creating a new file in the root namespace of your module called `Localization.resx`. The naming of this file is important as EvoSC# will look for this particular resource containing locales.

::: info
Your IDE might be able to create this file and fill the contents automatically, but be aware that it may also generate a *.Design.cs* file, which we will not be using.
:::

In the file, paste the following contents:
```xml
<?xml version="1.0" encoding="utf-8"?>
<root>
  <xsd:schema id="root" xmlns="" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:msdata="urn:schemas-microsoft-com:xml-msdata">
    <xsd:element name="root" msdata:IsDataSet="true">
    </xsd:element>
  </xsd:schema>
  <resheader name="resmimetype">
    <value>text/microsoft-resx</value>
  </resheader>
  <resheader name="version">
    <value>1.3</value>
  </resheader>
  <resheader name="reader">
    <value>System.Resources.ResXResourceReader, System.Windows.Forms, Version=2.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089</value>
  </resheader>
  <resheader name="writer">
    <value>System.Resources.ResXResourceWriter, System.Windows.Forms, Version=2.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089</value>
  </resheader>
  <!-- Localization data goes here -->
</root>
```

We are now ready to begin adding data to this resource file. Your IDE might have an editor for this, which makes this process easier.

At the bottom, before the `</root>` tag, we can begin adding data tags. For example:
```xml
<data name="GreetPlayer" xml:space="preserve">
    <value>Hello {0}!</value>
</data>
```

The `name` attribute denotes the name of the locale key you wish to use, and inside the `<data>` tag, write the value within two `<value>` tags.

You have now successfully created your first localization file. This will be your default localization and the fallback for any other language that doesn't exist. We will get into how to add different languages later.

Note the `{0}` in the value. This will be replaced by an argument passed to the locale string. In this case, it is the first argument (position 0). You can add as many arguments as you want.

This supports all formatting from the [`string.Format`](https://learn.microsoft.com/en-us/dotnet/api/system.string.format) method.

## Using Localization
Most of the time, localization will be used for chat messages and [Manialinks](/development/modules/manialinks/introduction.html). We can begin with an example of using localization for a chat command that responds with a message to the chat.

```csharp
using EvoSC.Commands;
using EvoSC.Commands.Attributes;
using EvoSC.Common.Controllers;
using EvoSC.Common.Controllers.Attributes;
using EvoSC.Manialinks.Interfaces;

namespace EvoSC.Modules.Official.ExampleModule;

[Controller]
public class ExampleController2 : EvoScController<CommandInteractionContext>
{
    private readonly IServerClient _server;
    private readonly dynamic _locale;
    
    public ExampleController2(IServerClient server, Locale locale)
    {
        _server = server;
        _locale = locale;
    }

    [ChatCommand("greet", "Greet the player with localization.")]
    public async Task GreetPlayerAsync() => 
        _server.SendChatMessageAsync(_locale.GreetPlayer(Context.Player.NickName));
}
```

When a player sends the command `/greet` to the chat, the server will respond with whatever the current language that is set for EvoSC#. In this case, if we use the localization file above, we only have one language, so the message should be somthing similar to: *Hello PlayerName!*

Note the way we are setting up the locale object and refering to our string. Here we are using DynamicObject referencing, and to pass arguments to the locale, we call it like a method with the arguments to pass. If you didn't have any arguments to pass, you would omit the method call syntax and just type `_locale.GreetPlayer`.

There are other ways to refer to locales which we will go over later.

### Manialinks
To use localization in Manialinks, we need to pass the `Locale` instance as a variable to it.

For example:
```xml
<component>
    <using namespace="EvoSC.Common.Interfaces.Localization" />

    <property type="dynamic" name="Locale" />

    <template>
        <label text="{{ Locale.MyLocaleName }}}" textsize="2" />
    </template>
</component>
```

We must then pass the "Locale" variable when sending the manialink:
```csharp
_manialinks.SendManialinkAsync("MyManialink", new {
    Locale = _locale
});
```

## Referencing Localization Strings
Currently, there are two common ways to do this. Either through DynamicObject or an indexer.

### DynamicObject
This is the recommended method and is compatible with XML attributes, which are often used in Manialinks.

To use DynamicObject referencing, you first have to cast the `Locale` instance to `dynamic`.
With dependency injection, this can be done by injecting `Locale` and setting it to a dynamic variable in the class. For example:
```csharp
public class MyClass {
    // use the "dynamic" type here
    private readonly dynamic _locale;
    
    public ExampleController2(Locale locale)
    {
        _locale = locale;
    }
}
```

#### Referencing without Arguments
To obtain strings from a locale with no arguments, you can simple type the name of the locale like this:

```csharp
var myString = _locale.MyLocaleName;
```

#### Referencing with Arguments
For arguments, we call the locale name like a method, passing the needed arguments:

```csharp
var myString = _locale.MyLocaleName(arg1, arg2, ...);
```


### Indexer
If you're not using DynamicObject, you can reference the locales using the index pattern.

For example, lets say we have the class:

```csharp
public class MyClass {
    // use the "Locale" type here
    private readonly Locale _locale;
    
    public ExampleController2(Locale locale)
    {
        _locale = locale;
    }
}
```

#### Referencing without Arguments
We can now access our locale like this if we don't have any arguments to pass:
```csharp
var myString = _locale["MyLocaleName"];
```

#### Referencing with Arguments
If we have arguments, simply add arguments to the indexer:
```csharp
var myString = _locale["MyLocaleName", arg1, arg2, ...];
```

## Adding Multilingual Support
The process for adding languages is almost the same as creating the default localization file. But the difference is that you specify the define language as the file extension.

For example for German, the file would be called `Localization.de.resx`, French would be `Localization.fr.resx` and so on. You can find all the codes for each language [here](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-lcid/a9eac961-e77d-41a6-90a5-ce1a8b0cdb9c).

## Configuring the Default Language
To configure the default language, you can find an option under the `[Locale]` section of the `main.toml` config file called `defaultLanguage`. The format of this value is the same language code as explained above under *Adding Multilingual Support*.

## Player Specific Language
EvoSC# can adapt the output language depending on a player's selected language. To do this, prefix the locale reference with `.PlayerLanguage`.

For example:
```csharp
var myString = _locale.PlayerLanguage.MyLocaleName;
```
or 
```csharp
var myString = _locale.PlayerLanguage["MyLocaleName"];
```

Whenever you prefix with `.PlayerLanguage`, it puts the locale instance in the state that any reference from this point on will use the player's selected language.

You can get a player's selected language from the `Settings` property from an `IPlayer` instance.

## Arbitrary String Translations
It is possible to translate a string which contains localization references, and replace those references with the localization string. This is useful for refering to locales in compile-time constants such as command descriptions.

To reference a localization string, put the name in between two square brackets. For example: `[MyLocaleName]`

These can occur anywhere within a string, and you can put multiple of them. For example: `My locale: [MyLocaleName]`

To translate a string you can use the `Translate` method. For example:
```csharp
var translatedString = _locale.Translate("My locale: [MyLocaleName]");
```