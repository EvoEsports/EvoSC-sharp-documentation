# External Modules

External modules allow you to extend EvoSC# without modifying its core codebase. The process is similar to internal
modules, with a few key differences.

## Creating a New External Module

All external modules are distributed as compiled `.dll` files and placed in the `modules` directory of your EvoSC#
installation.

### Step 1: The Project & Module Class

1. Create a new **Class Library** project for your module.
2. Set the **Root namespace** to `EvoSC.Modules.<Project Name>`.
3. Target the `net8.0` framework.
4. Create your main module class, postfixed with `Module` (e.g., `PlayerModule`), and decorate it with the `[Module]`
   attribute.

Example:

```csharp
[Module]
public class PlayerModule : EvoScModule
{
}
```

### Step 2: Module Meta Information

Create an `info.toml` file in your project root with meta information about your module:

```toml
[info]
name = "PlayerModule"
title = "Player Module"
summary = "A module for handling and managing players."
version = "1.0.0"
author = "Evo"

[dependencies]
# Optional: List dependencies here
```

### Step 3: Handling Dependencies

If your module uses additional NuGet packages, you must merge all dependencies into a single `.dll`
using [ILRepack](https://github.com/gluck/il-repack). This ensures EvoSC# can load your module without missing
dependencies.

**How to use ILRepack:**

- Build your module.
- Use ILRepack to merge your module `.dll` and all required dependency `.dll`s into one file.

Example command:

```
ilrepack /out:./merged/PlayerModule.dll PlayerModule.dll Dependency1.dll Dependency2.dll
```

### Step 4: Packaging the Module

1. Create a folder inside the `modules` directory, named after your module (e.g., `modules/PlayerModule`).
2. Place your merged `.dll` and `info.toml` inside this folder.

Directory structure:

```
modules/
└─ PlayerModule/
   ├─ PlayerModule.dll
   └─ info.toml
```

### Step 5: Loading the Module

EvoSC# will automatically detect and load external modules placed in the `modules` directory at startup.

---

You can now begin developing your external module! For more details on module development, see
the [Module Documentation](/development/modules/).