module.exports = {
    extends: [
        'plugin:@typescript-eslint/strict-type-checked',
        'prettier', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    parserOptions: {
        ecmaVersion: 'es2021', // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports,
        project: true,
        tsconfigRootDir: __dirname,
    },
    env: {
        node: true,
    },
    overrides: [
        {
            extends: ['plugin:@typescript-eslint/disable-type-checked'],
            files: ['./**/*.js'],
        },
    ],
    rules: {
        'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
};
