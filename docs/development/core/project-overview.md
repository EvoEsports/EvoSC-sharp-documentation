# Overview of the Project

## Project Structure
The project is separated into two main parts. The source code and the tests.

### Main Source Code
The source code in `src` are structured into multiple projects that provides a set of functionalities.
Each of the projects have a set of rules on which other projects can reference them.

| Project | Description | Referenceability | 
|---------|-------------|------------------|
| `EvoSC.Common` | Core functionality and common code. | All other projects can reference this, but it cannot reference any other project. |
| `EvoSC.CLI` | Provides code for the commandline interface. | Only `EvoSC` can reference this project. |
| `EvoSC.Modules` | Main code that provides the module framework for the project. | Can only be referenced by modules and `EvoSC`. |
| `EvoSC.Commands` | Main code that provides chat command parsing and handling. | Can be referenced by modules, `EvoSC.Modules` and `EvoSC` |
| `EvoSC.EvoSC` | This is the EvoSC application itself as a console project. | Cannot be referenced by any projects. |

#### Internal Modules
There is an additional directory under `src` that isnt exactly a project directory in itself called `Modules`. But it contains multiple projects that form all the internal and core modules of EvoSC. These modules are referenced within the assembly of the main application itself and ship with it.

### Tests
Each of the sub projects in EvoSC has corresponding test projects under the `tests` directory found in the root of the project. The tests provides unit and integration tests for the general functionality of the code.