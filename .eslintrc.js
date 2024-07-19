module.exports = {
  // 启用 ESLint 插件
  plugins: ["vue"],
  // 继承一个预设的 ESLint 配置，并添加 Vue 相关的配置
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential", // 如果你使用的是 Vue 2，则使用 'plugin:vue/vue2-essential'
  ],
  // 定义你的规则
  rules: {
    // 这里可以覆盖或添加新的规则
  },
  // 指定 ESLint 检查哪些文件
  overrides: [
    {
      files: ["*.vue"],
      rules: {
        // 在这里可以指定仅适用于 Vue 文件的规则
      },
    },
  ],
};
