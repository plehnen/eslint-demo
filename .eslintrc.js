module.exports = {
  root: true,

  env: {
    node: true,
    es2022: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:vue/vue3-strongly-recommended',
    'eslint:recommended',
    '@vue/prettier',
    'plugin:vuejs-accessibility/recommended',

    // https://github.com/vuejs/eslint-plugin-vue#bulb-rules
    'plugin:vue/recommended',
    'plugin:vue/vue3-essential',

    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/eslint-config-typescript',
  ],

  parserOptions: {
    jsx: true,
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },

  plugins: ['import', 'promise', 'simple-import-sort', 'no-only-tests', 'vuejs-accessibility'],

  rules: {
    // Only allow debugger in development
    'no-debugger': process.env.PRE_COMMIT ? 'error' : 'off',
    // Only allow `console.log` in development
    'no-console': process.env.PRE_COMMIT ? ['error', { allow: ['warn', 'error'] }] : 'off',
    'import/no-relative-parent-imports': 'error',
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['./*/', '**../'],
            message: 'Relative imports are not allowed.',
          },
        ],
      },
    ],
    'vue/array-bracket-spacing': 'error',
    'vue/arrow-spacing': 'error',
    'vue/block-spacing': 'error',
    'vue/brace-style': 'error',
    'vue/camelcase': 'error',
    'vue/comma-dangle': ['error', 'always-multiline'],
    'vue/component-name-in-template-casing': 'error',
    'vue/dot-location': ['error', 'property'],
    'vue/eqeqeq': 'error',
    'vue/key-spacing': 'error',
    'vue/keyword-spacing': 'error',
    'vue/no-boolean-default': 'error',
    'vue/no-deprecated-scope-attribute': 'error',
    'vue/no-empty-pattern': 'error',
    'vue/object-curly-spacing': ['error', 'always'],
    'vue/padding-line-between-blocks': 'error',
    'vue/multi-word-component-names': 'off',
    'vue/v-on-event-hyphenation': [
      'error',
      'always',
      {
        autofix: true,
      },
    ],
    'vue/space-infix-ops': 'error',
    'vue/space-unary-ops': 'error',
    'vue/v-on-function-call': 'error',
    'vue/v-slot-style': 'error',
    'vue/valid-v-slot': 'error',
    'vue/prefer-import-from-vue': 'error',
    'vue/prefer-true-attribute-shorthand': 'error', // NOTE: properties with multiple types are not defaulting to true! in this case you can explicitly use :value="!!true"
    'vue/attribute-hyphenation': 'error',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'any',
          normal: 'any',
        },
        svg: 'any',
      },
    ],
    'vue/no-empty-component-block': 'error',
    'vue/no-use-computed-property-like-method': 'error',
    'vue/no-useless-mustaches': 'error',
    'vue/no-useless-v-bind': 'error',
    'vue/prefer-separate-static-class': 'error',
    'vue/v-for-delimiter-style': 'error',
    eqeqeq: 'error',
    'no-useless-return': 'error',
    'no-useless-rename': 'error',
    'no-return-await': 'error',
    'max-classes-per-file': 'off',
    'no-empty-function': 'off',
    'import/prefer-default-export': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-ignore': 'allow-with-description',
        minimumDescriptionLength: 5,
      },
    ],
    semi: [2, 'always'],
    'vue/no-v-html': 'off',
    'no-only-tests/no-only-tests': process.env.PRE_COMMIT ? 'error' : 'off',
    'vuejs-accessibility/label-has-for': [
      2,
      {
        controlComponents: ['ElInput'],
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'vue/no-multiple-template-root': 0,
    'vue/no-v-model-argument': 0,
    'vue/no-v-for-template-key': 0,
    'vue/script-setup-uses-vars': 0,
    'prefer-arrow-callback': 'error',
    // 'func-style': 'error', // currently not recommended, because some typescript functions (see assertions.ts or SimpleTable.vue) needs to be written as plain functions
    'func-names': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          [
            '^vue', // vue*
            '@route.*', // @route*
            '^@?\\w', // 3rd party libraries
            '^', // all remaining imports sorted alphabetically
            '^@/utils(/.*|$)', // utils
            '^@/modules(/.*|$)', // modules
            '^.+\\.s?css$', // css
            '^\\.', // relative import
            '^\\u0000', // type imports...
            '^@?\\w.*\\u0000$',
            '^[^.].*\\u0000$',
            '^\\..*\\u0000$',
          ],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
  },

  globals: {
    require: true,
    process: true,
    module: true,
    __dirname: true,
  },

  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
    },
    {
      files: ['*.ts', '*.tsx'],
      extends: ['plugin:@typescript-eslint/recommended'],
    },
    {
      files: ['tests/unit/**/*', 'tests/e2e/**/*', '**/__tests__/*.{j,t}s?(x)', '**/*.{spec,unit,cy}.{j,t}s?(x)'],
      rules: {
        'no-restricted-imports': 'off',
      },
    },
    {
      files: ['src/**/*', 'tests/unit/**/*', 'tests/e2e/**/*'],
      env: {
        browser: true,
      },
    },
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/*.{spec,unit}.{j,t}s?(x)'],
      globals: {
        mount: false,
        shallowMount: false,
        shallowMountView: false,
        createComponentMocks: false,
        createModuleStore: false,
      },
    },
    {
      files: ['**/*.{vue,ts,tsx}'],
      extends: ['@vue/typescript/recommended', '@vue/eslint-config-typescript'],
      rules: {
        '@typescript-eslint/no-unused-vars': ['warn'],
        '@typescript-eslint/no-explicit-any': ['off'],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
    },
  ],
};
