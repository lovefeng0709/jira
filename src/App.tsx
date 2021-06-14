import React, { Suspense } from 'react';
import ErrorBoundary from 'components/error-boundary';
import { FullPageErrorFallback, FullPageLoading } from 'components/lib';
import { useAuth } from 'context/auth-context';
import './App.css'; 
// 代码分割 动态组件  登录与未登录
const AuthenticatedApp =  React.lazy(() => import('authenticated-app'));
const UnauthenticatedAPP =  React.lazy(() => import('unauthenticated-app'));

function App() {
  const {user} = useAuth()
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
       <Suspense fallback={<FullPageLoading/>}>
        {user?<AuthenticatedApp/>:<UnauthenticatedAPP/>}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
