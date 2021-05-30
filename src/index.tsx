/*
 * @Descripttion: test
 * @Date: 2021-04-26 15:53:01
 * @LastEditors: love-coding
 * @LastEditTime: 2021-05-29 18:16:07
 */
import './wdyr';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DevTools, loadServer } from "jira-dev-tool";
//务必在jira-dev-tool后引入  jira-dev-tool中也用了antd 所以要覆盖掉
import 'antd/dist/antd.less'
import { AppProviders } from 'context';
loadServer(()=>ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <DevTools/>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root')
));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
