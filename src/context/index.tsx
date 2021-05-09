/*
 * @Descripttion: test
 * @Date: 2021-04-28 10:38:54
 * @LastEditors: love-coding
 * @LastEditTime: 2021-05-09 18:26:00
 */

import React,{ ReactNode } from "react"
import { AuthProvider } from "./auth-context"
import { QueryClient, QueryClientProvider } from "react-query";
export const AppProviders = ({children}:{children:ReactNode})=>{
    const queryClient = new QueryClient()
    return <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </QueryClientProvider>
   
}