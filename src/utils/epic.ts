import { QueryKey, useMutation, useQuery } from "react-query";
import { Epic } from "types/epic";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig} from "./use-optimistic-options";

export const useEpics = (params?: Partial<Epic>)=>{
    const client = useHttp();
	// useQuery的第一个参数为['projects',params] 就是当params变化时也会重新请求
   return useQuery<Epic[]>(['epics',params],()=> client('epics',{data:params}))
}

export const useAddEpic = (queryKey:QueryKey) => {
	const client = useHttp()
	
	return useMutation(
		(params: Partial<Epic>)=>client(`epics`,{
			data:params,
			method: 'POST'
		}),
		  useAddConfig(queryKey)
		)
}
export const useDeleteEpic = (queryKey:QueryKey)=>{
	const client = useHttp()
	
	return useMutation(
		({id}:{id:number})=>client(`epics/${id}`,{
			method: 'DELETE'
		}),
		  useDeleteConfig(queryKey)
		)
}