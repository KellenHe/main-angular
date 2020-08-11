const less = require('less');
const LessPluginCleanCSS = require('less-plugin-clean-css');
const LessPluginNpmImport = require('less-plugin-npm-import');
const fs = require('fs');
const darkThemeVars = require('../src/assets/theme-dark');

const appStyles = 'src/styles.less'; // 应用的样式入口文件
const themeContent = `@import '${appStyles}';`;

less.render(themeContent, {
  javascriptEnabled: true,
  plugins: [new LessPluginNpmImport({ prefix: '~' }), new LessPluginCleanCSS({ advanced: true })],
  modifyVars: {
    ...darkThemeVars
  }
}).then(data => {
  fs.writeFileSync(
    // 主题样式的输出文件
    'src/assets/style.dark.css',
    data.css
  )
}).catch(e => {
  // 记录渲染错误
  console.error(e);
});
