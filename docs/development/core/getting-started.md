# Getting started

This documentation page will help you set up a directory containing everything you need to start working on EvoSC#

## Prerequisites

Start by installing [Docker Engine](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/) depending on your OS.
You will also need [.NET 7](https://dotnet.microsoft.com/en-us/download)

## Setting up a server

Go to the [Trackmania player page](https://players.trackmania.com/), log into your Ubisoft account, click "servers" and create a new server account.  
**You will need the login and password for the server, so note them down.**

Then, clone the repository for EvoSC# using `git clone <repository link>`  
  
In the newly created directory, edit the `docker-compose.yml` file.  
You will need to replace the ``MASTER_LOGIN`` and ``MASTER_PASSWORD`` lines with the server username and password you noted earlier.  
  
If you are planning to open this server to the internet, you may want to change the MariaDB user info, but by default your server should be limited to your local network.

Boot up the Trackmania server using ``docker-compose up``. If you want to have the server running in the background, you can add the `-d` argument.  
  
Your server should be up and running! You can connect to it in Trackmania in the __local__ section of the __play__ menu.

## Booting up EvoSC#

Go to the ``EvoSC`` directory, and run ``dotnet build`` to compile the source code. __You will need to do that every time before starting EvoSC if you modified the code__, else the changes won't apply.

If you are using the default docker-compose setup, create the ``config`` directory under ``src/EvoSC/bin/Debug/net7.0/`` and place the [example main.toml](main.toml) inside.

Then, run ``dotnet run``. EvoSC# is now up and running! Test it by connecting to the server: if there is a message with your login in the chat when connecting, everything should work. If not, check the terminal for errors.