module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime"
    ],
    "overrides":  [
        {
          "files": ["*.ts", "*.tsx"],
          "rules": {
            "no-undef": "off"
          }
        }
      ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "ecmaFeatures": {
            "jsx": true
          },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "settings": {
        "react": {
          "version": "detect"
        }
      },
    "rules": {
        "react/jsx-uses-react": "error",
     "react/jsx-uses-vars": "error",
     "no-unused-vars": "off",
    }
}
