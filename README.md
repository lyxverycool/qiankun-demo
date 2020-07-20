### 介绍

基于qiankun的微前端demo

对于项目改造基本需要以下几个步骤:

#### 1.修改package.json 的name项目名称，和路由保持一致，不改也可以。

#### 2.修改webpack打包output和跨域

const packageName = require('../package.json').name;

if (process.env.DEV_SERVER) {
  webpackConfig.devServer.headers = { 'Access-Control-Allow-Origin': '*' }
}

webpackConfig.output = {
  library: `reactcsr`,
  libraryTarget: 'umd',
  jsonpFunction: `webpackJsonp_${packageName}`,
  globalObject: 'window',
}

#### 3.public-path.js

if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}

#### 4.对于入口文件进行修改

import './public-path'

<BrowserRouter basename={window.__POWERED_BY_QIANKUN__ ? '/reactcsr' : '/'}> //更改路由

function storeTest(props) {
  props.onGlobalStateChange((value, prev) => console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev), true)
  props.setGlobalState({
    ignore: props.name,
    user: {
      name: props.name,
    },
  })
}

//判断渲染环境
if (!window.__POWERED_BY_QIANKUN__) {
  render(App)
}

export async function bootstrap() {
  console.log('react app bootstraped')
}

export async function mount(props) {
  console.log('props from main framework', props)
  storeTest(props)
  render(App)
}

export async function unmount(props) {
  const { container } = props
  ReactDOM.unmountComponentAtNode(
    container
      ? container.querySelector('#app')
      : document.querySelector('#app')
  )
}

### 安装

`npm run install:all`

### 运行(开发模式)

`npm run start:all`

### 构建

`npm run build:all`

### tips 

pushstate 跳转有问题，这里用a标签进行导航跳转


