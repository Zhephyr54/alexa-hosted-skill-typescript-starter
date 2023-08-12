/* 
*** For VS Code ONLY ***

Edit the "start-or-restart-vscode-debug.js" and "stop-vscode-debug.js" scripts
if you have different VS Code shortcuts for debugger.

* ASK Toolkit for VS Code is required.
This script is intended to be used with the ask-sdk-local-debug package (ASK Toolkit for VS Code)
and its debugger configuration which route all requests to your skill to your local code.  
https://developer.amazon.com/en-US/docs/alexa/ask-toolkit/vs-code-testing-simulator.html#prepare

This script does:
1. warn you and ask for confirmation to continue if your skill-package has changed since your last push on master branch,
2. lint, compile TS files and then start VS Code debugger,
3. watch and restart debugger on file changes,
4. stop debugger on script exit

* Idea taken from https://github.com/microsoft/vscode/issues/10979#issuecomment-647013166
*/
const execSync = require('child_process').execSync;
const exec = require('child_process').exec;
const spawn = require('child_process').spawn;
const join = require('path').join;
const readline = require('readline');
const yesno = require('yesno');

const wasItemModified = (revision, itemPath) => {
    return !!execSync(
        `git diff --quiet ${revision} -- ${itemPath} || ` +
            `node -e "console.log('DIFF')"`,
        {
            cwd: __dirname,
        },
    ).toString();
};

(async () => {
    const wasSkillPackageModified = wasItemModified(
        'master',
        '../../skill-package',
    );

    if (wasSkillPackageModified) {
        const shouldContinue = await yesno({
            question:
                'Current skill-package has differences with master branch.\n' +
                'You should probably push the related changes before (local model is NOT used in debug mode).\n' +
                'Are you sure you want to continue? (Y/n)',
            defaultValue: false,
        });
        if (!shouldContinue) {
            return;
        }
    }

    const watch = exec(
        'concurrently -n "lint,tsc" --kill-others ' +
            '"npm run lint:watch" ' +
            '"tsc-watch ' +
            // It would best to be able to start debug on first success only
            // and to restart on subsequent success but we can't tell the difference
            // (onFirstSuccess option allows us to run only on first success but onSuccess will also run in this case)
            '--onSuccess \\"node start-or-restart-vscode-debug.js\\"" ',
        { cwd: __dirname },
    );
    watch.stdout.pipe(process.stdout);

    const exitHandler = () => {
        // Spawn an inpependant process to ensure stopping VSCode debugger before exiting
        const subprocess = spawn(
            'node',
            [join(__dirname, 'stop-vscode-debug.js')],
            {
                cwd: __dirname,
                detached: true,
                stdio: 'ignore',
            },
        );
        subprocess.unref();
        process.exit();
    };
    process.on('exit', exitHandler);
    // Catches ctrl+c event
    process.on('SIGINT', exitHandler);
    // Catches "kill pid"
    process.on('SIGUSR1', exitHandler);
    process.on('SIGUSR2', exitHandler);
    // Catches uncaught exceptions
    process.on('uncaughtException', exitHandler);

    // Exit on escape or ctrl+c
    readline.emitKeypressEvents(process.stdin);
    process.stdin.on('keypress', (str, key) => {
        if (key.name == 'escape' || (key && key.ctrl && key.name == 'c')) {
            process.stdin.pause();
            process.exit();
        }
    });
    process.stdin.setRawMode(true);
    process.stdin.resume();
})();
