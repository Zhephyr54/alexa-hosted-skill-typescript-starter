/**
 * Used to clean the tmp folder cloned from this repository while following the README documentation
 * after successfully copying the missing files to your new skill.
 */
const fs = require('fs');

/* Configuration */
const cloneRootFolder = './tmp';
/* END Configuration */

fs.rmSync(cloneRootFolder, { recursive: true, force: true });
