/*
 * @Descripttion: test
 * @Date: 2021-06-08 16:51:16
 * @LastEditors: love-coding
 * @LastEditTime: 2021-06-08 16:52:18
 */
import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "types/task";
import { useHttp } from "./http";
import { SortProps } from "./kanban";
import { useAddConfig, useDeleteConfig, useEditConfig, useReorderConfig } from "./use-optimistic-options";

export const useTasks = (params?: Partial<Task>)=>{
    const client = useHttp();
	// useQuery的第一个参数为['projects',params] 就是当params变化时也会重新请求
   return useQuery<Task[]>(['tasks',params],()=> client('tasks',{data:params}))
}
export const useAddTask = (queryKey:QueryKey) => {
	const client = useHttp()
	
	return useMutation(
		(params: Partial<Task>)=>client(`tasks`,{
			data:params,
			method: 'POST'
		}),
		  useAddConfig(queryKey)
		)
}

export const useTask = (id?:number) => {
	const client = useHttp()
	return useQuery<Task>(
			['task',{id}],
			()=>client(`tasks/${id}`),
			// 只有id存在才去获取
			{
				enabled:Boolean(id)
			}
		)
}

export const useEditTask = (queryKey:QueryKey) => {
	const client = useHttp()
	// useMutation()第二个参数中 onSuccess函数 就是更新
	return useMutation(
		(params: Partial<Task>)=>client(`tasks/${params.id}`,{
			data:params,
			method: 'PATCH'
		 }),
		 useEditConfig(queryKey)
		)
}
export const useDeleteTask = (queryKey:QueryKey)=>{
	const client = useHttp()
	
	return useMutation(
		({id}:{id:number})=>client(`tasks/${id}`,{
			method: 'DELETE'
		}),
		  useDeleteConfig(queryKey)
		)
}
export const useReorderTask =(queryKey:QueryKey)=>{
	const client = useHttp()
	return useMutation(
		(params:SortProps) => {
			return client('tasks/reorder',{
				data:params,
				method:'POST'
			})
		},
		useReorderConfig(queryKey)
	)
}