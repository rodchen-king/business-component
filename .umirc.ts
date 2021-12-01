/*
 * @Description:
 * @Author: rodchen
 * @Date: 2021-11-30 22:59:39
 * @LastEditTime: 2021-12-01 11:16:09
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
    'https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/js/plugin.js',
    'https://cdn.jsdelivr.net/npm/luckysheet/dist/luckysheet.umd.js',
  ],
  styles: [
    'https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/css/pluginsCss.css',
    'https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/plugins.css',
    'https://cdn.jsdelivr.net/npm/luckysheet/dist/css/luckysheet.css',
    'https://cdn.jsdelivr.net/npm/luckysheet/dist/assets/iconfont/iconfont.css',
  ],
  // more config: https://d.umijs.org/config
});
