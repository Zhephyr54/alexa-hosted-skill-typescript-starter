/**
 * Used to copy the missing files after the creation of a new Alexa-hosted skill
 * with the import operation of the Alexa developer console.
 */
const { promises: fs } = require('fs');
const readFileSync = require('fs').readFileSync;
const path = require('path');

async function copyDir(src, dest) {
    await fs.mkdir(dest, { recursive: true });
    let entries = await fs.readdir(src, { withFileTypes: true });

    for (let entry of entries) {
        let srcPath = path.join(src, entry.name);
        let destPath = path.join(dest, entry.name);

        entry.isDirectory()
            ? await copyDir(srcPath, destPath)
            : await fs.copyFile(srcPath, destPath);
    }
}

function getJsonFromFile(filePath) {
    const fileContent = readFileSync(filePath, 'utf8', function (err) {
        console.error(
            `An error occured while trying to read the '${filePath}' file: ${err}`,
        );
    });
    return JSON.parse(fileContent);
}

/* Configuration */
const cloneRootFolder = './tmp';
const destRootFolder = '.';
const foldersToCopy = ['.vscode', 'test'];
const filesToCopy = [
    '.gitignore',
    'LICENSE.txt',
    'testing.json',
    'skill-package/interactionModels/custom/en-US.json',
    'skill-package/interactionModels/custom/fr-FR.json',
];
/* END Configuration */

// We need to copy the files that are ignored by the import operation when creating the new Alexa-hosted skill
foldersToCopy.forEach((folder) =>
    copyDir(
        path.join(cloneRootFolder, folder),
        path.join(destRootFolder, folder),
    ),
);
filesToCopy.forEach((file) =>
    fs.copyFile(
        path.join(cloneRootFolder, file),
        path.join(destRootFolder, file),
    ),
);

// Adding french locale to 'skill-package/skill.json' with the defined skill name
// because only the default locale is taken when creating the Alexa-hosted skill from the import
const currentJson = getJsonFromFile(
    path.join(destRootFolder, 'skill-package/skill.json'),
);
const clonedJson = getJsonFromFile(
    path.join(cloneRootFolder, 'skill-package/skill.json'),
);
currentJson.manifest.publishingInformation.locales['fr-FR'] =
    clonedJson.manifest.publishingInformation.locales['fr-FR'];
currentJson.manifest.publishingInformation.locales['fr-FR'].name =
    currentJson.manifest.publishingInformation.locales['en-US'].name;
fs.writeFile(
    path.join(destRootFolder, 'skill-package/skill.json'),
    JSON.stringify(currentJson, null, 4),
);
