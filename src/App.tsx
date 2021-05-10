/*
 * @Descripttion: test
 * @Date: 2021-04-26 15:53:01
 * @LastEditors: love-coding
 * @LastEditTime: 2021-05-10 20:07:01
 */
import { AuthenticatedApp } from 'authenticated-app';
import ErrorBoundary from 'components/error-boundary';
import { FullPageErrorFallback } from 'components/lib';
import { useAuth } from 'context/auth-context';
import React from 'react';
import { UnauthenticatedAPP } from 'unauthenticated-app';
import './App.css';

function App() {
  const {user} = useAuth()
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user?<AuthenticatedApp/>:<UnauthenticatedAPP/>}
      </ErrorBoundary>
    </div>
  );
}

export default App;
