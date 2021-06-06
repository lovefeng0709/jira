/*
 * @Descripttion: test
 * @Date: 2021-05-31 14:34:00
 * @LastEditors: love-coding
 * @LastEditTime: 2021-06-06 19:17:16
 */
import { useMemo } from "react"
import { useUrlQueryParam } from "utils/url"
// 项目列表搜索的参数
export const useProjectsSearchParams = ()=>{

    const [param,setParam]= useUrlQueryParam(['name', 'personId'])
	return [
        useMemo(()=>({...param,personId:Number(param.personId)||undefined}),[param]),
        setParam
     ] as const
}

export const useProjectModal = ()=>{
    const [{projectCreate},setProjectCreate] = useUrlQueryParam([
        'projectCreate'
    ])
    const open = ()=> setProjectCreate({projectCreate:true})
    const close = ()=> setProjectCreate({projectCreate:undefined})
    return { 
        projectModalOpen:projectCreate=== 'true',
        open,
        close
     }
}