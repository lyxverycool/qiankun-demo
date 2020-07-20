import { loadMicroApp } from 'qiankun';

const app1 = loadMicroApp(
  { name: 'reactcsr', entry: '//localhost:3001', container: '#reactcsr' },
  {
    // sandbox: {
    //   strictStyleIsolation: true,
    // },
  },
);

const app2 = loadMicroApp(
  { name: 'react16', entry: '//localhost:3002', container: '#react16' },
  {
    // sandbox: {
    //   strictStyleIsolation: true,
    // },
  },
);