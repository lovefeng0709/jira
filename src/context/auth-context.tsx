/*
 * @Descripttion: test
 * @Date: 2021-04-28 10:39:17
 * @LastEditors: love-coding
 * @LastEditTime: 2021-05-10 18:40:26
 */
import React, { ReactNode, useEffect, useState } from 'react';
import * as auth from 'auth-provider';
import { User } from 'screens/project-list/search-panel';
import { http } from 'utils/http';
import { useAsync } from 'utils/use-async';
import { FullPageErrorFallback, FullPageLoading } from 'components/lib';
//初始化user
const bootstrapUser=async ()=>{
    let user = null;
    const token = auth.getToken()
    if(token){
        const data = await http('me',{token})
        user = data.user
    }
    return user
}
const AuthContext = React.createContext<
	 {
		user: User | null;
		login: (form: AuthForm) => Promise<void>;
		register: (form: AuthForm) => Promise<void>;
		logout: () => Promise<void>;
	}
	| undefined
>(undefined);
AuthContext.displayName = 'AuthContext';
interface AuthForm {
	username: string;
	password: string;
}

// 函数式编程 point free   user=>setUser(user)  setUser
export const AuthProvider = ({children}:{ children:ReactNode}) => {
    const {data:user,run,error,isLoading,isIdle,isError,setData:setUser} = useAsync<User|null>()
	
    const login = (form: AuthForm) => auth.login(form).then(setUser);
	const register = (form: AuthForm) => auth.register(form).then(setUser);
	const logout = () => auth.logout().then(() => setUser(null));
    
    useEffect(() => {
       run(bootstrapUser())
    }, []);
    if(isIdle||isLoading){
        return <FullPageLoading />
    }
    if(isError){
        return <FullPageErrorFallback error={error} />
    }
	return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />;
};

export const useAuth = ()=>{
    const context = React.useContext(AuthContext)
    if(!context){
        throw new Error('useAuth必须在AuthProvider中使用')
    }
    return context;
}