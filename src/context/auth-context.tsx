/*
 * @Descripttion: test
 * @Date: 2021-04-28 10:39:17
 * @LastEditors: love-coding
 * @LastEditTime: 2021-06-05 15:32:17
 */
import React, { ReactNode, useCallback, useEffect } from 'react';
import * as auth from 'auth-provider';
import { User } from 'screens/project-list/search-panel';
import { http } from 'utils/http';
import { useAsync } from 'utils/use-async';
import { FullPageErrorFallback, FullPageLoading } from 'components/lib';
import * as authStore from 'store/auth.slice'
import { useDispatch, useSelector } from 'react-redux';
import { bootstrap, selectUser } from 'store/auth.slice';
//初始化user
export const bootstrapUser=async ()=>{
    let user = null;
    const token = auth.getToken()
    if(token){
        const data = await http('me',{token})
        user = data.user
    }
    return user
}

export interface AuthForm {
	username: string;
	password: string;
}

// 函数式编程 point free   user=>setUser(user)  setUser
export const AuthProvider = ({children}:{ children:ReactNode}) => {
    const {run,error,isLoading,isIdle,isError} = useAsync<User|null>()
	
    const dispatch:(...args:unknown[])=>Promise<User> = useDispatch()
    useEffect(() => {
       run(dispatch(bootstrap()))
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    if(isIdle||isLoading){
        return <FullPageLoading />
    }
    if(isError){
        return <FullPageErrorFallback error={error} />
    }
	return <div>{children}</div>
};

export const useAuth = ()=>{
    // const context = React.useContext(AuthContext)
    // if(!context){
    //     throw new Error('useAuth必须在AuthProvider中使用')
    // }
    const dispatch:(...args:unknown[])=> Promise<User> =useDispatch()
    const user = useSelector(selectUser)
    // 当导出函数时 请加上useCallback
    const login = useCallback((form: AuthForm) => dispatch(authStore.login(form)),[dispatch])
    const register = useCallback((form: AuthForm) => dispatch(authStore.register(form)),[dispatch])
    const logout =  useCallback(() => dispatch(authStore.logout()),[dispatch])

    return {
        user,
        login,
        register,
        logout
     }
}