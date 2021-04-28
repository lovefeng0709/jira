/*
 * @Descripttion: test
 * @Date: 2021-04-28 10:38:54
 * @LastEditors: love-coding
 * @LastEditTime: 2021-04-28 16:25:06
 */

import React,{ ReactNode } from "react"
import { AuthProvider } from "./auth-context"

export const AppProviders = ({children}:{children:ReactNode})=>{
    return <AuthProvider>
        {children}
    </AuthProvider>
}