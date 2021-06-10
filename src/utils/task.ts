/*
 * @Descripttion: test
 * @Date: 2021-06-08 16:51:16
 * @LastEditors: love-coding
 * @LastEditTime: 2021-06-08 16:52:18
 */
import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "types/task";
import { useHttp } from "./http";
import { useAddConfig } from "./use-optimistic-options";

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