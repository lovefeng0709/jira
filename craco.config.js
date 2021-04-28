/*
 * @Descripttion: test
 * @Date: 2021-04-28 20:19:59
 * @LastEditors: love-coding
 * @LastEditTime: 2021-04-28 20:23:09
 */
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': 'rgb(0,82,204)','@font-size-base':'16px'},
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};