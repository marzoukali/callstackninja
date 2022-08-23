# Callstackninja
A VS Code extension to visualize the call stack in a more friendly way
than the traditional call stack displayed by the debugger.

# Usage
1. After installing this extension, add breakpoints to the lines that needs to be debugged
2. Run the extension from the command pallette using `ctrl + shift + p` and searching for `Visualize Stack`
3. Watch the magic happen in the next column when you use the debugger as you normally would ✨

# Steps To Contribute (Developer)
- Clone the project
- Open using VS Code
- Do not click yes on C# (extension) popup that requires assets to build and debug
- in the terminal `npm install`
- if you don't see out folder in the root path, run this cmd in the terminal `npm run compile` to generate the file.
- F5 to open the dev env IDE
- From the IDE open the Sample folder which contains .NET 6 project
- Make sure that you have .NET 6 SDK & runtime installed
- In the terminal hit `dotnet run` to ensure that it works as expected
- Ctl_Shift+P then write Visualize Stack and hit enter
- Now F5 & You should be able to see the drawings in there
# callstackninja README

## Features

Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

For example if there is an image subfolder under your extension project workspace:

\!\[feature X\]\(images/feature-x.png\)

> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow.

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: Enable/disable this extension.
* `myExtension.thing`: Set to `blah` to do something.

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
