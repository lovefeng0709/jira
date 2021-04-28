/*
 * @Descripttion: test
 * @Date: 2021-04-26 15:53:01
 * @LastEditors: love-coding
 * @LastEditTime: 2021-04-28 16:17:57
 */
import { AuthenticatedApp } from 'authenticated-app';
import { useAuth } from 'context/auth-context';
import React from 'react';
import { UnauthenticatedAPP } from 'unauthenticated-app';
import './App.css';

function App() {
  const {user} = useAuth()
  return (
    <div className="App">
      {user?<AuthenticatedApp/>:<UnauthenticatedAPP/>}
    </div>
  );
}

export default App;
