/*
 * @Descripttion: test
 * @Date: 2021-05-10 12:45:00
 * @LastEditors: love-coding
 * @LastEditTime: 2021-06-01 16:19:30
 */


import { useCallback, useEffect } from "react";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProjects = (params?: Partial<Project>)=>{
    const client = useHttp();
    const {run,...result} = useAsync<Project[]>()
	const fetchProjects = useCallback(()=> client('projects',{data:cleanObject(params||{})}),[params,client])

    useEffect(
		() => {
			run(fetchProjects(),{retry:fetchProjects})	
		},
		
		[ params,run, fetchProjects]
	);
    return result
}

export const useEditProject = () => {
	const {run,...asyncResult} = useAsync()
	const client = useHttp()
	const mutate = (params:Partial<Project>)=>{
	  return run(client(`projects/${params.id}`,{data:params,method: 'PATCH'}))
	} 
	return { 
		mutate,
		...asyncResult
	}
}
export const useAddProject = () => {
	const {run,...asyncResult} = useAsync()
	const client = useHttp()
	const mutate = (params:Partial<Project>)=>{
		run(client(`projects/${params.id}`,{data:params,method: 'POST'}))
	} 
	return { 
		mutate,
		...asyncResult
	}
}