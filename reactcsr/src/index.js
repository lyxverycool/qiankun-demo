import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './routes/index'
import './public-path'

const app = document.getElementById('app')

const render = Component => {
  ReactDOM.render(
    <BrowserRouter basename={window.__POWERED_BY_QIANKUN__ ? '/reactcsr' : '/'}>
      <Component />
    </BrowserRouter>,
    app,
  )
}

function storeTest(props) {
  props.onGlobalStateChange((value, prev) => console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev), true)
  props.setGlobalState({
    ignore: props.name,
    user: {
      name: props.name,
    },
  })
}

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
