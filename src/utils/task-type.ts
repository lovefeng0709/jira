import { useQuery } from "react-query";
import { TaskType } from "types/task-type";
import { useHttp } from "./http";

export const useTaskTypes = ()=>{
    const client = useHttp();
	// useQuery的第一个参数为['projects',params] 就是当params变化时也会重新请求
   return useQuery<TaskType[]>(['taskTypes'],()=> client('taskTypes'))
}
