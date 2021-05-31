/*
 * @Descripttion: test
 * @Date: 2021-05-31 14:34:00
 * @LastEditors: love-coding
 * @LastEditTime: 2021-05-31 14:56:28
 */
import { useMemo } from "react"
import { useUrlQueryParam } from "utils/url"

export const useProjectsSearchParams = ()=>{

    const [param,setParam]= useUrlQueryParam(['name', 'personId'])
	return [
        useMemo(()=>({...param,personId:Number(param.personId)||undefined}),[param]),
        setParam
     ] as const
}