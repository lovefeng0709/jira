/*
 * @Descripttion: test
 * @Date: 2021-05-10 12:45:00
 * @LastEditors: love-coding
 * @LastEditTime: 2021-06-07 21:14:36
 */


import { useQuery,useMutation, QueryKey } from "react-query";
import { Project } from "screens/project-list/list";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig, useEditConfig } from "./use-optimistic-options";

export const useProjects = (params?: Partial<Project>)=>{
    const client = useHttp();
	// useQuery的第一个参数为['projects',params] 就是当params变化时也会重新请求
   return useQuery<Project[]>(['projects',params],()=> client('projects',{data:params}))
}

export const useEditProject = (queryKey:QueryKey) => {
	const client = useHttp()
	// useMutation()第二个参数中 onSuccess函数 就是更新
	return useMutation(
		(params: Partial<Project>)=>client(`projects/${params.id}`,{
			data:params,
			method: 'PATCH'
		 }),
		 useEditConfig(queryKey)
		)
}
export const useAddProject = (queryKey:QueryKey) => {
	const client = useHttp()
	
	return useMutation(
		(params: Partial<Project>)=>client(`projects`,{
			data:params,
			method: 'POST'
		}),
		  useAddConfig(queryKey)
		)
}

export const useDeleteProject = (queryKey:QueryKey)=>{
	const client = useHttp()
	
	return useMutation(
		({id}:{id:number})=>client(`projects/${id}`,{
			method: 'DELETE'
		}),
		  useDeleteConfig(queryKey)
		)
}
export const useProject = (id?:number) => {
	const client = useHttp()
	return useQuery<Project>(
			['project',{id}],
			()=>client(`projects/${id}`),
			// 只有id存在才去获取
			{
				enabled:Boolean(id)
			}
		)
}