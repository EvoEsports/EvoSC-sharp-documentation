# Form Validation in Manialinks
Often you need to make sure that the input from users are correct. And this can quickly result in messy and duplicate code. Therefore EvoSC tries to solve this problem by providing some helpful functionality to validate user input.

EvoSC takes advantage of the model validation system that comes with .NET and is the same one used in ASP.NET. It does not implement it 1:1 and much of it is different. But when it comes to custom model validation and validation attributes, it is essentially the same.

We will go over how it works in EvoSC, but you can find the official documentation [here](https://learn.microsoft.com/en-us/aspnet/core/mvc/models/validation?view=aspnetcore-7.0). Notably validation attributes and IValidatableObject.

## Validation Attributes
Validation attributes provides *class-level validation*, which means we can define how to validate a property within the model class itself.

These attributes can be used to define validation rules on the model properties.

For example, let's take the nickname model we saw in previous pages. We want to make sure that the user wrote at least 3 characters for their nickname:
```csharp
[EntryModel]
public class SetNicknameInput
{
    [MinLength(3)]
    public string Nickname { get; set; }
}
```

For a list of built-in attributes check out [this page](https://learn.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations?view=net-8.0).

### Custom Validation Attributes
You can create a custom validation attribute by creating an attribute class which inherits `ValidationAttribute`. You can then override the `IsValid` method to implement that validation code:
```csharp
[AttributeUsage(AttributeTargets.Property)]
public class MyValidationAttribute : ValidationAttribute
{
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        // check validation ...
    }
}
```
After implementing the validation code, you can now use it on properties in a model:
```csharp
[EntryModel]
public class SetNicknameInput
{
    [MyValidation] // [!code hl]
    public string Nickname { get; set; }
}
```

## Class-level validation without attributes
### `IValidatableObject`
### `IAsyncValidatableObject`

## Validating a Model
The `ManialinkController` class implement automatic form validation in the background. You can also manually trigger this validation by calling the `ValidateModelAsync` instance method.

This will both return the validation result, and also set the validation result for the current context. However, it is typically not necessary to call this method.

For most cases, all you need to do in order to check if a model is valid, is to check if `IsModelValid` is true.

You can also access the `ModelValidation` property to obtain the validation result. This also contains more details about which properties are valid/invalid and error messages.

::: details See Example
```csharp
[Controller]
public class MyActionsController : ManialinkController
{
    private readonly IServerClient _server;

    public MyActionsController(IServerClient server)
    {
        _server = server;
    }

    public Task SetNicknameAsync(SetNicknameInput userInput)
    {
        if (IsModelValid) // [!code hl]
        { 
            return _server.SuccessMessageAsync($"Nickname set to {userInput.Nickname}!", Context.Player);
        }
        else
        {
            return _server.ErrorMessageAsync($"You must enter at least 3 characters!", Context.Player);
        }
    }
}
```
:::

## Validation Responses

## Dependency Injection
