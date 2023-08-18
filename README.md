# Alexa-hosted Hello World skill in TypeScript

This project is a boilerplate to start developping an Alexa hosted-skill with TypeScript.

## Features

-   TypeScript code
-   [Eslint with TypeScript plugin](https://typescript-eslint.io)
-   Prettier to get the style right
-   type safe [i18next](https://www.i18next.com) for internationalization and localization (with english and french for starting)
-   [i18next-fs-backend](https://github.com/i18next/i18next-fs-backend) to dynamically load localization files (no changes needed to source code when adding a new language)
-   a command to easily and quickly deploy to the Alexa-hosted skill Development version ([see more](#deploying))
-   a command to directly [run and debug your local code from VS Code](https://developer.amazon.com/en-US/docs/alexa/ask-toolkit/vs-code-testing-simulator.html#test) compiling and reloading after code changes ([see more](#running-with-debug))
-   a git pre-push hook (with [husky](https://typicode.github.io/husky/)) to trigger a warning when pushing directly to master without doing any changes to the package.json file (it would prevent the TypeScript file compilation on the AWS Lambda side)
-   [Bespoken](https://read.bespoken.io/unit-testing/guide/#overview) for Unit Testing ([see more](#running-unit-tests))

It was generated using the official ask-V2 `ask-cli new` command, then modified in order to have it TypeScripted.
It is thus intented to be fully compatible with the `ask` V2 commands.

## Based on other similar projects ❤

-   [alexa-skill-typescript-boilerplate-ask-v2](https://github.com/ThomasVuillaume/alexa-skill-typescript-boilerplate-ask-v2) by Thomas Vuillaume
-   [Alexa-Hosted-Typescript-Starter](https://github.com/gotwig/Alexa-Hosted-Typescript-Starter) by gotwig

## Requirements

A global installation is required for the following packages:

-   ask-cli [2.30.4] : `npm install -g ask-cli`
-   bespoken-tools [2.6.7] : `npm install -g bespoken-tools`

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

18. You are now ready to start working on your skill!

### Running (with debug)

```bash
npm run dev
```

### Deploying

```bash
npm run deploy
```

### Running Unit Tests

```bash
npm run test
```

### Other commands

## Folder structure

| File/Folder          | Description                                                                                         |
| :------------------- | :-------------------------------------------------------------------------------------------------- |
| hooks                | Configuration custom build scripts, here used to compile TS files                                   |
| infrastructure/      | Contains CloudFormation definitions for deploying the skill to AWS                                  |
| lambda/              | Contains the source code for the skill that utilizes the ASK SDK                                    |
| skill-package/       | Skill resources utilized by the ASK platform such as skill manifest, interaction models, and assets |
| test/unit            | Skill unit tests, written in order to be used with Bespoken tool                                    |
| ask-resources config | Configuration for the Alexa skill project                                                           |

## Deploy the skill

In order for Alexa to communicate with the skill code, it will need to be deployed and hosted on the cloud using this command.
Using the hooks provided to deal with TypeScript files, it will take care of the compilation, before deploying JS files.

```bash
ask deploy
```

The deploy command performs the following steps:

1. `skill-package/` resources will be zipped and uploaded to the ASK platform via SMAPI's [Skill Package Service](https://developer.amazon.com/docs/smapi/skill-package-api-reference.html).
2. `lambda/` source files will be built and zipped for deployment to AWS. We currently support the build flows of npm for Nodejs, pip for Python and maven for Java developers.
3. `infrastructure/` definitions will be used to provision resources on AWS. The `lambda/`'s zip file from the previous step will be deployed to the provisioned AWS Lambda function.

### Windows-users warning

If you are developing on Windows, please pay a special attention to [this page](https://github.com/alexa/ask-cli/blob/develop/docs/FAQ.md#q-for-windows-users-if-your-skill-return-empty-response-and-log-shows-module-not-found-genericerrormapper-or-cannot-find-module-dispatchererrormappergenericerrormapper-how-to-resolve). In few words: Powershell is not zipping files properly, you have to update a package otherwise your Lambda will not work.
