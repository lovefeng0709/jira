/*
 * @Descripttion: test
 * @Date: 2021-04-28 10:38:54
 * @LastEditors: love-coding
 * @LastEditTime: 2021-06-04 18:43:50
 */

import React,{ ReactNode } from "react"
import { AuthProvider } from "./auth-context"
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "store";
export const AppProviders = ({children}:{children:ReactNode})=>{
    const queryClient = new QueryClient()
    return <Provider store={store}>
               <QueryClientProvider client={queryClient}>
                    <AuthProvider>
                        {children}
                    </AuthProvider>
                </QueryClientProvider>
            </Provider>
}