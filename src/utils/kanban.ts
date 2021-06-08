/*
 * @Descripttion: test
 * @Date: 2021-06-08 16:38:20
 * @LastEditors: love-coding
 * @LastEditTime: 2021-06-08 16:50:47
 */
import { useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { useHttp } from "./http";

export const useKanbans = (params?: Partial<Kanban>)=>{
    const client = useHttp();
	// useQuery的第一个参数为['projects',params] 就是当params变化时也会重新请求
   return useQuery<Kanban[]>(['kanbans',params],()=> client('kanbans',{data:params}))
}
