const execSync = require('child_process').execSync;
const fs = require('fs');
const join = require('path').join;

const getPackageVersionFromFile = (packageFilePath) => {
    const packageFileContent = fs.readFileSync(
        packageFilePath,
        'utf8',
        function (err) {
            console.error(
                `An error occured while trying to read the '${packageFilePath}' package file: ${err}`,
            );
        },
    );
    const packageJson = JSON.parse(packageFileContent);
    return packageJson.version;
};

// Getting the previous package.json file content (from master branch = skill development version)
// to check if package version was changed manually
const tmpFolder = join(__dirname, '../tmp');
try {
    if (!fs.existsSync(tmpFolder)) {
        fs.mkdirSync(tmpFolder);
    }
} catch (err) {
    console.error(
        `An error occured while trying to create tmp directory: ${err}`,
    );
}

const prevPackageFilePath = join(tmpFolder, 'prev-package.json');
execSync(`git show master:lambda/package.json > "${prevPackageFilePath}"`);

const prevPackageVersion = getPackageVersionFromFile(prevPackageFilePath);
const currentPackageVersion = process.env.npm_package_version;
const hasPackageVersionChanged = prevPackageVersion !== currentPackageVersion;

fs.rmSync(tmpFolder, { recursive: true, force: true });

// If the package version was not changed, we do it automatically
// in order to force an npm install and the postinstall script run
// to compile TS files on the AWS Lambda of the Alexa-hosted skill
if (!hasPackageVersionChanged) {
    execSync('npm version patch --no-git-tag-version');
    const newPackageVersion = getPackageVersionFromFile(
        join(__dirname, '../package.json'),
    );
    console.log(
        `Package version was automatically bumped to ${newPackageVersion}`,
    );
}

const msg = process.argv[2] ? process.argv[2] : 'Automatic deployment';
execSync(
    'cd .. && ' +
        'git add . && ' +
        `(git diff-index --quiet HEAD -- || git commit -m "${msg}") && ` +
        'git push origin master',
    { stdio: [0, 1, 2] },
);
