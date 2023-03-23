# ManiaScript
With the template engine, we can separate ManiaScript and template markup in their own files.

For organizational and consistency purposes, we recommend to keep all ManiaScript files within a `Templates/Scripts/` directory in your module project.

## Example
Let's take a simple example of a ManiaScript file that just prints something to the console. Our module's name is `MyModule`.

We begin creating a file in `Templates/Scripts` called `PrintConsole.ms`. Note the file exentions `.ms`.

In this file we create a main function that prints something to the console:
```
main() {
    log("Hello there!");
}
```

We can now import this script into our template:
```xml
<template>
    <script resource="MyModule.Scripts.PrintConsole" main="true" />
</template>
```

Displaying this manialink in-game will log `Hello there!` to the script console.

One thing to note here is that we specify `main="true"` because this ManiaScript file contains the main function. If you want to include ManiaScript code that has functions, variables or structs to be used, but doesn't have a main function, you can omit this attribute.