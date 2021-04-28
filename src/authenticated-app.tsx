/*
 * @Descripttion: test
 * @Date: 2021-04-28 15:52:21
 * @LastEditors: love-coding
 * @LastEditTime: 2021-04-28 16:19:13
 */
import { ProjectListScreen } from "screens/project-list"
import * as React from 'react';
import { useAuth } from "context/auth-context";
export const AuthenticatedApp = () => {
    const {logout} = useAuth()
    return (
        <div>
            <button onClick={logout}>登出</button>
            <ProjectListScreen/>
        </div>
    )
}