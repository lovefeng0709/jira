
import { useQuery } from "react-query";
import { User } from "types/User";
import { useHttp } from "./http";

export const useUsers = (params?: Partial<User>)=>{
    const client = useHttp();
	// useQuery的第一个参数为['projects',params] 就是当params变化时也会重新请求
   return useQuery<User[]>(['users',params],()=> client('users',{data:params}))
}