/*
 * @Descripttion: test
 * @Date: 2021-05-10 12:45:00
 * @LastEditors: love-coding
 * @LastEditTime: 2021-06-07 17:01:23
 */


import { useQuery,useMutation, useQueryClient } from "react-query";
import { Project } from "screens/project-list/list";
import { useHttp } from "./http";

export const useProjects = (params?: Partial<Project>)=>{
    const client = useHttp();
	// useQuery的第一个参数为['projects',params] 就是当params变化时也会重新请求
   return useQuery<Project[]>(['projects',params],()=> client('projects',{data:params}))
}

export const useEditProject = () => {
	const client = useHttp()
	const queryClient = useQueryClient()
	// useMutation()第二个参数中 onSuccess函数 就是更新
	return useMutation(
		(params: Partial<Project>)=>client(`projects/${params.id}`,{
			data:params,
			method: 'PATCH'
		 }),{
			 onSuccess:()=> queryClient.invalidateQueries('projects')
		 }
		)
}
export const useAddProject = () => {
	const client = useHttp()
	const queryClient = useQueryClient()
	
	return useMutation(
		(params: Partial<Project>)=>client(`projects`,{
			data:params,
			method: 'POST'
		}),{
			onSuccess:()=> queryClient.invalidateQueries('projects')
		  }
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