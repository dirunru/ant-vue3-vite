# Vue 3 + Vite


### 插件
```
  配置行的配置项目：npm | pnpm | yarn create vue@latest 
  npm install ant-design-vue@4.x --save
  npm install @ant-design/icons-vue --save
  npm install unplugin-vue-components -D // 自动按需引入组件
  npm install less less-loader --save-dev  // less
  npm install pinia // 状态管理
  npm install dayjs --save // 日期处理
  npm install vue-router@4 // 路由 
  npm install @vue/cli-plugin-router --save-dev // 路由
  npm install unplugin-auto-import --save-dev // 自动按需引入方法
  npm install postcss-px-to-viewport-8-with-include --save-dev // px转rpx
  npm install axios // 请求
  npm install echarts --save // 图表
  npm install mockjs --save-dev // mock
  npm install corejs // 兼容
  npm install eslint eslint-plugin-vue eslint-config-prettier eslint-plugin-prettier prettier --save-dev  // eslint 暂时没有使用
  npm install typescript --save-dev // ts
  npm install --save-dev @vitejs/plugin-legacy 
  npm install @vue/cli-plugin-typescript --save-dev // ts
  npm install --save-dev @types/node // ts
  npm install --save-dev js-cookie // Cookie来实现记住密码功能（js-cookie）,使用jsencrypt对密码进行加密解密
  npm install --save-dev jsencrypt // jsencrypt 对密码进行加密解密
  npm i --save-dev @types/js-cookie // ts版本的
  npm install --save-dev lodash-es // lodash es6版本


  
  <!-- 删除node_modules 和 package-lock.json -->
  rm -rf node_modules  
  rm package-lock.json 
  npm install
```
prettier.config.json
```
{
  "printWidth": 10000,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "quoteProps": "as-needed",
  "jsxSingleQuote": false,
  "trailingComma": "none",
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "always",
  "requirePragma": false,
  "insertPragma": false,
  "proseWrap": "never",
  "htmlWhitespaceSensitivity": "strict",
  "vueIndentScriptAndStyle": true,
  "endOfLine": "lf"
}
// printWidth: 指定每行代码的最大长度，默认为80。这里设置为200，意味着Prettier会尝试将代码格式化到每行不超过200个字符。
// tabWidth: 指定制表符（tab）的宽度，即它应该占据多少个空格。这里设置为2，意味着一个tab会被替换为两个空格。
// useTabs: 是否使用制表符（tab）进行缩进，而不是空格。这里设置为false，表示使用空格进行缩进。
// semi: 是否在语句末尾打印分号。这里设置为true，表示在JavaScript等语言中，Prettier会在语句末尾添加分号。
// singleQuote: 是否使用单引号而不是双引号。这里设置为true，表示使用单引号。
// quoteProps: 对象字面量中的属性是否强制使用单引号、双引号或按需（即保持原样）。这里设置为'as-needed'，表示Prettier会根据情况选择是否使用引号。
// jsxSingleQuote: 在JSX中是否使用单引号。这里设置为false，表示在JSX中默认使用双引号。
// trailingComma: 在多行数组和对象字面量中是否打印尾随逗号。这里设置为'none'，表示不打印尾随逗号。
// bracketSpacing: 在对象字面量、数组字面量中的大括号或方括号之间是否打印空格。这里设置为true，表示打印空格。
// bracketSameLine: 是否将多行JSX元素（> 多行）放在最后一行的末尾，而不是单独放在下一行（仅对>多行JSX有效）。这里设置为false，表示不这样做。
// arrowParens: 箭头函数参数周围是否添加括号。这里设置为'always'，表示总是添加括号。
// requirePragma: 是否要求文件顶部有特殊的注释/* prettier-ignore */来忽略该文件。这里设置为false，表示不需要。
// insertPragma: 是否在文件的顶部插入@prettier标记。这里设置为false，表示不插入。
// proseWrap: Markdown文本是否换行。这里设置为'never'，表示不换行。
// htmlWhitespaceSensitivity: HTML文件中空格的敏感度。这里设置为'strict'，表示对空格的处理更加严格。
// vueIndentScriptAndStyle: Vue文件中的<script>和<style>标签是否缩进。这里设置为true，表示缩进。
// endOfLine: 行尾序列。这里设置为'lf'，表示使用Unix/Linux风格的换行符（\n）
```