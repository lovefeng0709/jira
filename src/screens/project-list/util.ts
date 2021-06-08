/*
 * @Descripttion: test
 * @Date: 2021-05-31 14:34:00
 * @LastEditors: love-coding
 * @LastEditTime: 2021-06-08 11:20:59
 */
import { useMemo } from "react"
import { useProject } from "utils/project"
import { useSetUrlSearchParam, useUrlQueryParam } from "utils/url"
// 项目列表搜索的参数
export const useProjectsSearchParams = ()=>{

    const [param,setParam]= useUrlQueryParam(['name', 'personId'])
	return [
        useMemo(()=>({...param,personId:Number(param.personId)||undefined}),[param]),
        setParam
     ] as const
}
 export const useProjectQueryKey = () =>{
     const [params]= useProjectsSearchParams()
    return ['projects',params]
 }

export const useProjectModal = ()=>{
    const [{projectCreate},setProjectCreate] = useUrlQueryParam([
        'projectCreate'
    ])
    const [{editingProjectId},setEditingProjectId] = useUrlQueryParam([
        'editingProjectId'
    ])
    const {data:editingProject,isLoading} = useProject(Number(editingProjectId))
    const setUrlParams = useSetUrlSearchParam();
    const open = ()=> setProjectCreate({projectCreate:true})
    const close = () => setUrlParams({ projectCreate: "", editingProjectId: "" });
    const startEdit = (id: number)=>  setEditingProjectId({editingProjectId:id})
    return { 
        projectModalOpen:projectCreate=== 'true'|| Boolean(editingProjectId),
        open,
        close,
        startEdit,
        editingProject,
        isLoading
     }
}