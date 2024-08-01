module.exports = {
  // 启用 ESLint 插件
  plugins: ['vue'],
  // 继承一个预设的 ESLint 配置，并添加 Vue 相关的配置
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential' // 如果你使用的是 Vue 2，则使用 'plugin:vue/vue2-essential'
  ],
  // 定义你的规则
  rules: {
    // 这里可以覆盖或添加新的规则
  },
  // 指定 ESLint 检查哪些文件
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        // 在这里可以指定仅适用于 Vue 文件的规则
      }
    }
  ]
};
// module.exports = {
//   root: true,
//   env: {
//     browser: true,
//     node: true,
//     es6: true,
//     'vue/setup-compiler-macros': true
//   },
//   parser: 'vue-eslint-parser',
//   extends: [
//     'plugin:vue/vue3-recommended',
//     'eslint:recommended',
//     'plugin:prettier/recommended'
//   ],
//   parserOptions: {
//     ecmaVersion: 2020,
//     sourceType: 'module',
//     jsxPragma: 'React',
//     ecmaFeatures: {
//       jsx: true
//     }
//   },
//   rules: {
//     'vue/script-setup-uses-vars': 'error',
//     'vue/custom-event-name-casing': 'off',
//     'no-use-before-define': 'off',
//     'no-unused-vars': [
//       'error',
//       {
//         argsIgnorePattern: '^_',
//         varsIgnorePattern: '^_'
//       }
//     ],
//     'space-before-function-paren': 'off',
//     'vue/attributes-order': 'off',
//     'vue/one-component-per-file': 'off',
//     'vue/html-closing-bracket-newline': 'off',
//     'vue/max-attributes-per-line': 'off',
//     'vue/multiline-html-element-content-newline': 'off',
//     'vue/singleline-html-element-content-newline': 'off',
//     'vue/attribute-hyphenation': 'off',
//     'vue/require-default-prop': 'off',
//     'vue/html-self-closing': [
//       'error',
//       {
//         html: {
//           void: 'always',
//           normal: 'never',
//           component: 'always'
//         },
//         svg: 'always',
//         math: 'always'
//       }
//     ],
//     'vue/v-on-event-hyphenation': 'off',
//     'vue/multi-word-component-names': 'off'
//   }
// };
