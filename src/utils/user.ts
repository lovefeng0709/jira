import { useEffect } from "react";
import { User } from "screens/project-list/search-panel";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

/*
 * @Descripttion: test
 * @Date: 2021-05-10 14:13:37
 * @LastEditors: love-coding
 * @LastEditTime: 2021-06-01 16:34:39
 */
export const useUsers = (params?:Partial<User>) =>{
    const client = useHttp();
    const {run,...result} = useAsync<User[]>()
    useEffect(
		() => {
			run(client('users',{data:cleanObject(params||{})}))	
		},
		
		[ params ,client, run]
	);
    return result
}