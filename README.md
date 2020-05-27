# QuizWorld project codenamed `Antila`.
For polish documentation check readme-pl.md

## Dependecies
* Visual Studio 2017 or newer with .NET extention installed
* nodejs and npm (tested on 6.13.4)

## Runnning Project
1. Open Visual Studio, and open WebAplication.sln
1. After that try to run the project without debug (Known bugs, will descript later), everything will be now building and compiling for first time, so it will take a little.
1. Go to VS packet manager and run: 
```powershell
update-database
```
1. Everything should be running now.

## Known bugs
When running project few times and closing it there are often multiple node.js proccesses. Unfortunately you need to kill them manually.
Eslint can be buggy, when getting data of unknown lenght, simple ? in types should do.
