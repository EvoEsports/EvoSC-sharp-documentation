# Getting started

For EvoSC#, there are two methods of running it on your dedicated server. Either by using

* Docker - [Docker Engine](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/) (if using Docker)

## Setup using .NET tools

**Prerequisites:**
* [.NET Core SDK](https://dotnet.microsoft.com/en-us/download/dotnet)
* Database provider of your choice (see supported database providers here)

**Installing the EvoSC# Tool:**

Once you have the .NET core SDK installed, you can use `dotnet tool` to download the server controller by running
```bash
dotnet tool install --global EvoEsports.EvoSC
```
After you have installed the tool, you will now be able to use the EvoSC# CLI globally on your system.
Before you try running the tool, make sure to create a folder in which you want EvoSC# to be installed into. After you have created the folder, open a terminal in that folder and run
```bash
evosc install
```

## Setup using Docker

**Prerequisites:**
* [Docker Engine](https://docs.docker.com/engine/install/)
* [Docker Compose](https://docs.docker.com/compose/install/)


