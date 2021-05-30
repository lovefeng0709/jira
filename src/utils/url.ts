/*
 * @Descripttion: test
 * @Date: 2021-05-11 19:33:43
 * @LastEditors: love-coding
 * @LastEditTime: 2021-05-30 15:39:47
 */

import { useMemo } from "react"
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import { cleanObject } from "utils"

/** 
 * 返回页面url中，指定键的参数值
 */
export const useUrlQueryParam =<K extends string> (keys: K[]) =>{
    const [searchParams,setSearchParams] = useSearchParams()
    return [
        useMemo(()=>
            keys.reduce((prev,key)=>{
                return {...prev, [key]:searchParams.get(key)||''}
            },{} as {[key in K]: string}),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [searchParams] ),
        (params:Partial<{[key in K]: unknown}>)=>{
            const o = cleanObject({...Object.fromEntries(searchParams),...params}) as URLSearchParamsInit
            return setSearchParams(o)
        }
    ] as const
}