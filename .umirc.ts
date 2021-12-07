/*
 * @Description:
 * @Author: rodchen
 * @Date: 2021-11-30 22:59:39
 * @LastEditTime: 2021-12-07 18:47:10
 * @LastEditors: rodchen
 */
import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'business-component',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  scripts: [
    'https://bitsun-website.oss-cn-shanghai.aliyuncs.com/cdn/dist/plugins/js/plugin.js',
    'https://bitsun-website.oss-cn-shanghai.aliyuncs.com/cdn/dist/luckysheet.umd.js',
  ],
  styles: [
    'https://bitsun-website.oss-cn-shanghai.aliyuncs.com/cdn/dist/plugins/css/pluginsCss.css',
    'https://bitsun-website.oss-cn-shanghai.aliyuncs.com/cdn/dist/plugins/plugins.css',
    'https://bitsun-website.oss-cn-shanghai.aliyuncs.com/cdn/dist/css/luckysheet.css',
    'https://bitsun-website.oss-cn-shanghai.aliyuncs.com/cdn/dist/assets/iconfont/iconfont.css',
  ],
  // more config: https://d.umijs.org/config
});
