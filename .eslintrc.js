module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react',
    ],
    rules: {
        indent: ['error', 4, { ignoredNodes: ['JSXElement *'] }],
        'react/jsx-indent': ['warn', 4],
        'no-tabs': 0,
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'no-multi-spaces': ['error'],
        'max-len': ['error', 140],
        'react/react-in-jsx-scope': 'off',
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        'no-whitespace-before-property': 'error',
        camelcase: 'error',
        'new-cap': 'error',
        'no-console': 0,
        'comma-dangle': 'error',
        'react/prop-types': 0,
        'default-param-last': 0,
        'no-undef': 0,
    },
};
