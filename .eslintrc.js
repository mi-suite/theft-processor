module.exports = {
    "env": {
        "node": true,
        "jest": true,
        "es6": true
    },
    "extends": [
        "plugin:@typescript-eslint/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript"
    ],
    "parser": "@typescript-eslint/parser",
    "plugins": [
        "import",
        "@typescript-eslint/eslint-plugin"
    ],
    "rules": {
        "prettier/prettier": "off",
        "eol-last": [
            "error",
            "always"
        ],
        "arrow-parens": [
            "error",
            "always"
        ],
        "indent": "off",
        "import/no-unresolved": [
            "error"
        ],
        "import/named": [
            "error"
        ],
        "import/default": [
            "error"
        ],
        "import/no-absolute-path": [
            "error"
        ],
        "import/no-webpack-loader-syntax": [
            "error"
        ],
        "import/no-self-import": [
            "error"
        ],
        "import/no-cycle": [
            "error"
        ],
        "import/no-useless-path-segments": [
            "error"
        ],
        "import/first": [
            "error"
        ],
        "import/no-duplicates": [
            "error"
        ],
        "import/order": [
            "error",
            {
                "groups": [
                    "external",
                    "parent",
                    "sibling"
                ],
                "newlines-between": "always",
                "alphabetize": {
                    "order": "asc",
                    "caseInsensitive": true
                }
            }
        ],
        "import/newline-after-import": [
            "error",
            {
                "count": 1
            }
        ],
        "import/no-default-export": [
            "error"
        ],
        "semi": [
            "error",
            "always"
        ],
        "space-before-function-paren": [
            "error",
            "always"
        ],
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/explicit-member-accessibility": [
            "error"
        ],
        "@typescript-eslint/space-before-function-paren": [
            "error"
        ],
        "@typescript-eslint/semi": [
            "error"
        ],
        "@typescript-eslint/indent": [
            "error",
            4
        ],
        "@typescript-eslint/interface-name-prefix": [
            "error",
            {
                "prefixWithI": "always"
            }
        ],
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/generic-type-naming": [
            "error",
            "T[A-Z][a-zA-Z]+$"
        ],
        "@typescript-eslint/no-explicit-any": "off",
        "object-shorthand": [
            "error",
            "consistent"
        ],
        "comma-dangle": [
            "error",
            "always-multiline"
        ],
        "no-unused-vars": [
            "error",
            {
                "vars": "all",
                "args": "none",
                "ignoreRestSiblings": false
            }
        ],
        "quotes": [
            "error",
            "single"
        ],
        "object-property-newline": [
            "error",
            {
                "allowAllPropertiesOnSameLine": false
            }
        ],
        "no-mixed-spaces-and-tabs": "error",
        "no-multiple-empty-lines": ["error", { "max": 1, "maxBOF": 1 }],
        "no-trailing-spaces": "error",
        "no-whitespace-before-property": "error",
        "space-before-blocks": [
            "error",
            "always"
        ],
        "spaced-comment": [
            "error",
            "always"
        ],
        "no-spaced-func": "error",
        "semi-spacing": [
            "error",
            {
                "before": false,
                "after": true
            }
        ],
        "keyword-spacing": [
            "error",
            {
                "before": true,
                "after": true
            }
        ],
        "object-curly-spacing": [
            "error",
            "always"
        ]
    },
    "overrides": [
        {
            "files": [
                "**/*.test.tsx"
            ],
            "env": {
                "jest": true
            }
        }
    ]
};
