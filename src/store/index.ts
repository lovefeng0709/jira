/*
 * @Descripttion: test
 * @Date: 2021-06-04 15:54:12
 * @LastEditors: love-coding
 * @LastEditTime: 2021-06-04 21:08:37
 */

import { configureStore } from "@reduxjs/toolkit"
import { projectListSlice } from "screens/project-list/project-list.slice"
import { authSlice } from "./auth.slice"

export const rootReducer = {
    projectList: projectListSlice.reducer,
    auth:authSlice.reducer
}
export const  store = configureStore({
    reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>