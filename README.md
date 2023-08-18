# Alexa-hosted Hello World skill in TypeScript

This project is a boilerplate to start developping an Alexa hosted-skill with TypeScript.

## Features

-   TypeScript code
-   [Eslint with TypeScript plugin](https://typescript-eslint.io)
-   Prettier to get the style right
-   type safe [i18next](https://www.i18next.com) for internationalization and localization (with English and French for starting)
-   [i18next-fs-backend](https://github.com/i18next/i18next-fs-backend) to dynamically load localization files (no changes needed to source code when adding a new language)
-   a [run command](#vs-code-only-running-with-debug) to directly [run and debug your local code from VS Code](https://developer.amazon.com/en-US/docs/alexa/ask-toolkit/vs-code-testing-simulator.html#test) while compiling and reloading after code changes
-   a [deploy command](#deploying) to easily and quickly deploy to the Alexa-hosted skill Development version
-   a [test command](<(#unit-testing)>) using [Bespoken](https://read.bespoken.io/unit-testing/guide/#overview) for Unit Testing
-   a git pre-push hook (with [husky](https://typicode.github.io/husky)) to trigger a warning when pushing directly to master without doing any changes to the package.json file (it would prevent the TypeScript file compilation on the AWS Lambda side)

It was generated using the official ask-V2 `ask-cli new` command, then modified in order to have it TypeScripted.
It is thus intented to be fully compatible with the `ask` V2 commands.

## Based on other similar projects ❤

-   [alexa-skill-typescript-boilerplate-ask-v2](https://github.com/ThomasVuillaume/alexa-skill-typescript-boilerplate-ask-v2) by Thomas Vuillaume
-   [Alexa-Hosted-Typescript-Starter](https://github.com/gotwig/Alexa-Hosted-Typescript-Starter) by gotwig

## Prerequisites

A global installation is required for the following packages:

-   ask-cli [2.30.4]:

```bash
npm install -g ask-cli
```

-   bespoken-tools [2.6.7]:

```bash
npm install -g bespoken-tools
```

The TypeScript version is 5.1.6.

This project has been built using `ask-cli`. It needs it to run. If you haven't configured it yet, please [follow those instructions](https://github.com/alexa/ask-cli#getting-started).

Full API reference is available [here](https://developer.amazon.com/fr-FR/docs/alexa/smapi/ask-cli-command-reference.html).

## Usage

### Getting started

1. Open the [Alexa developer console](https://developer.amazon.com/alexa/console/ask) and log in.

2. Click **Create Skill**. The **Create a new skill page** appears.

3. For **Name your Skill**, type your skill name.

4. For **Choose a primary locale**, choose **English (US)**.

5. For **Choose a type of experience**, select **Other**.

6. For **Choose a model**, select **Custom**.

7. For **Hosting services**, select **Alexa-hosted (Node.js)**.

8. For **Hosting region**, select your preferred hosting region.

9. Click **Next**. The **Templates page** appears.

10. Click **Import skill**. The **Import skill dialog** appears.

11. Copy and paste this repository URL as the **public Git repository URL**:

```
https://github.com/Zhephyr54/alexa-hosted-skill-typescript-starter
```

12. Click **Import**. The message "Creating your Alexa hosted skill" appears. If Alexa validates that the Git repository contains an Alexa skill that it can import, Alexa creates your Alexa-hosted skill.

13. It will take a minute to create your Alexa-hosted skill, then you will be taken to the Build tab of the console. **It is possible that you end up being stuck with the dialog indefinitely stating "Preparing the code editor..."**. In this case, simply go back to the [Alexa developer console](https://developer.amazon.com/alexa/console/ask) and you should see your new skill ready.

14. From the [Alexa developer console](https://developer.amazon.com/alexa/console/ask), click on the **Copy Skill ID** action of your newly created skill to copy its ID.

15. Run the following command (paste your skill ID that was just copied) to clone your new Alexa-hosted skill locally:

```bash
ask init --hosted-skill-id <your hosted skill ID>
```

16. Type your preferred folder name for the skill project and hit enter to start the initialization.

17. Your new skill will be missing any files not contained in the `lambda` and `skill-package` folders as well as the French locale skill definition. To add these:

-   set your working directory to your new skill project root folder:

```bash
cd <your skill project folder>
```

-   then run the following commands:

```bash
git clone https://github.com/Zhephyr54/alexa-hosted-skill-typescript-starter tmp
node tmp/scripts/copy-new-skill-missing-files.js
node tmp/scripts/rm-tmp-cloned-folder.js
git add .
git commit -m "Add missing files and French locale skill definition"
git push origin master
```

18. Set your working directory to the `lambda` folder then install dependencies:

```bash
cd lambda
npm i
```

19. You are now ready to start working on your skill!

### [Optional] Install the recommended VS Code extensions

You can check the recommended VS Code extensions for this project by opening the Extensions view (Ctrl+Shift+X) and entering `@recommended`.

### [VS Code only] Running (with debug)

#### Prerequisites

-   The `.vscode` folder must be at the root level of your VS Code instance for VS Code to find the debug configuration inside the [launch.json](.vscode/launch.json) file.

-   The `--region` argument of the [launch.json](.vscode/launch.json) debug configuration file must match the Alexa region corresponding to the marketplace for your developer account (check [this table](https://developer.amazon.com/en-US/docs/alexa/hosted-skills/build-a-skill-end-to-end-using-an-alexa-hosted-skill.html#regions)).

-   Your VS Code keyboard shortcuts for debugging (Run > Start/Stop/Restart Debugging) must match the keyboard inputs set in the [start-or-restart-vscode-debug.js](lambda/scripts/start-or-restart-vscode-debug.js) and [stop-vscode-debug.js](lambda/scripts/stop-vscode-debug.js) scripts. If you have different VS Code shortcuts for debugging, edit those files (see [the nutjs keyboard API](https://nutjs.dev/apidoc/keyboard) if needed).

See the [Test Skills in Visual Studio Code page](https://developer.amazon.com/en-US/docs/alexa/ask-toolkit/vs-code-testing-simulator.html#prepare) for more details.

#### Command

To [run and debug your local code from VS Code](https://developer.amazon.com/en-US/docs/alexa/ask-toolkit/vs-code-testing-simulator.html#test) while compiling and reloading after code changes, run the following command (from the `lambda` folder):

```bash
npm run dev
```

This command will launch a debug session and route all requests to your skill to your local code. It will also:

-   Warn you and ask for confirmation to continue if your `skill-package` folder has changed since your last push on master branch
-   Lint, compile TypeScript files and restart debugger on file changes
-   Automatically stop debugger on script exit

### Deploying

To deploy your current changes to the **Development Version** of your skill, run the following command (from the `lambda` folder):

```bash
npm run deploy -- "Your commit message"
```

or if you prefer to use an automatic commit message ("Automatic deployment"):

```bash
npm run deploy
```

This command performs the following steps:

1. Automatically bump the [package.json](lambda/package.json) version if the current package file version was not changed (compared to the master branch). This is mandatory to force an npm install and the subsequent postinstall script run and compile TypeScript files on the AWS Lambda side of the Alexa-hosted skill.

2. Add all current file contents to the git index. **Note that you should handle it and commit manually if you want to perform multiple commits before a deployment**.

3. If necessary, commit all changes with the argument message passed to the command or with an automatic message if missing.

4. Push all changes to the master branch (= skill Development Version).

### Unit Testing

To run the unit tests with [Bespoken](https://read.bespoken.io/unit-testing/guide/#overview), run the following command (from the `lambda` folder):

```bash
npm run test
```

### Other commands

| Command                | Description                                                                                  |
| :--------------------- | :------------------------------------------------------------------------------------------- |
| **npm run build**      | Compile the TypeScript files from the **src** folder into the **dist** folder                |
| **npm run clean**      | Remove the **dist** folder, the **tsconfig.tsbuildinfo** file and the **test_output** folder |
| **npm run lint**       | Lint all TypeScript files                                                                    |
| **npm run lint:fix**   | Lint and fix all TypeScript files                                                            |
| **npm run lint:watch** | Lint all TypeScript files in reactive/watch mode (lint on file changes)                      |

## Folder structure

| File/Folder     | Description                                                                                                         |
| :-------------- | :------------------------------------------------------------------------------------------------------------------ |
| lambda/.husky/  | Contains [husky](https://typicode.github.io/husky) git hooks                                                        |
| lambda/scripts/ | Contains Node.js scripts used for [debug](#vs-code-only-running-with-debug) and [deployment](#deploying)            |
| lambda/src/     | Contains the TypeScript source code for the skill that utilizes the ASK SDK                                         |
| lambda/index.js | The JavaScript entrypoint of the Alexa skill                                                                        |
| scripts/        | Contains Node.js scripts used to setup the Alexa-hosted skill (see [the Getting Started section](#getting-started)) |
| skill-package/  | Skill resources utilized by the ASK platform such as skill manifest, interaction models, and assets                 |
| test/unit/      | Skill unit tests, written in order to be used with Bespoken tool                                                    |

### Windows-users warning

If you are developing on Windows, please pay a special attention to [this page](https://github.com/alexa/ask-cli/blob/develop/docs/FAQ.md#q-for-windows-users-if-your-skill-return-empty-response-and-log-shows-module-not-found-genericerrormapper-or-cannot-find-module-dispatchererrormappergenericerrormapper-how-to-resolve). In few words: Powershell is not zipping files properly, you have to update a package otherwise your Lambda will not work.
