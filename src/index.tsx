/*
 * @Descripttion: test
 * @Date: 2021-04-26 15:53:01
 * @LastEditors: love-coding
 * @LastEditTime: 2021-04-28 15:21:12
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {loadDevTools } from 'jira-dev-tool'
import { AppProviders } from 'context';
loadDevTools(()=>ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root')
));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
