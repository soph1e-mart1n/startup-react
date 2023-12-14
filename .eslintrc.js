module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        'jquery': true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "plugins": [
        "react",
        'jquery',
        'react-hooks'
    ],
    "rules": {
        'react/no-deprecated': ['warn'],
    }
}
