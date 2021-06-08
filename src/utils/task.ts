/*
 * @Descripttion: test
 * @Date: 2021-06-08 16:51:16
 * @LastEditors: love-coding
 * @LastEditTime: 2021-06-08 16:52:18
 */
import { useQuery } from "react-query";
import { Task } from "types/task";
import { useHttp } from "./http";

export const useTasks = (params?: Partial<Task>)=>{
    const client = useHttp();
	// useQuery的第一个参数为['projects',params] 就是当params变化时也会重新请求
   return useQuery<Task[]>(['tasks',params],()=> client('tasks',{data:params}))
}
