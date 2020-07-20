const { webpackConfig } = require('lyxcool-webpack')
const packageName = require('../package.json').name;

if (process.env.DEV_SERVER) {
  webpackConfig.devServer.headers = { 'Access-Control-Allow-Origin': '*' }
}

const output = webpackConfig.output
webpackConfig.output = {
  library: `reactcsr`,
  libraryTarget: 'umd',
  jsonpFunction: `webpackJsonp_${packageName}`,
  globalObject: 'window',
  ...output
}

module.exports = webpackConfig