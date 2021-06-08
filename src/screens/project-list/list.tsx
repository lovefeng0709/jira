/*
 * @Descripttion: test
 * @Date: 2021-04-26 16:41:03
 * @LastEditors: love-coding
 * @LastEditTime: 2021-06-08 16:05:25
 */
import React from 'react';
import { User } from "../../types/User";
import {Dropdown, Menu, Modal, Table, TableProps} from 'antd'
import dayjs from 'dayjs'
import {  Link } from 'react-router-dom';
import { Pin } from 'components/pin';
import { useDeleteProject, useEditProject } from 'utils/project';
import { ButtonNopadding } from 'components/lib';
import { useProjectModal, useProjectQueryKey } from './util';
import { Project } from '../../types/Project';
interface ListProps extends TableProps<Project>{
	users:User[]
}

export const List = ({  users,...props }:ListProps) => {
	
	const {mutate} = useEditProject(useProjectQueryKey())
	// 柯里化
	const pinProject = (id: number)=>(pin: boolean)=> mutate({id,pin})
	
	const columns = [
		 {
			 title:<Pin checked={true} disabled={true}/>,
			 render(value:string,project:Project){
				//  (pin)=>pinProject(project.id)(pin)  === pinProject(project.id)
				 return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)}/>
			 }
		 },
	      {
			title: '名称',
			sorter:(a:Project,b:Project)=>a.name.localeCompare(b.name),
			render(value:string,project:Project){
				return <Link to={String(project.id)}>{project.name}</Link>
			}
	      },
		  {
			title: '部门',
			dataIndex:'organization',
			sorter:(a:Project,b:Project)=>a.organization.localeCompare(b.organization)
	      },
		  {
			title: '负责人',
		     render:(value:string,project:Project)=>(<span>{users.find(user=>user.id === project.personId)?.name||'未知'}</span>)
	      },
		  {
			title: '创建时间',
		     render:(value:string,project:Project)=>(<span>{ project.created? dayjs(project.created).format("YYYY-MM-DD"):'无'}</span>)
	      },
		  {
			  render:(value:string,project:Project)=> <More project={project} />
		  }
        ]
	return <Table 
	         rowKey={"id"}
	         pagination={false} 
			 columns={columns} 
			 {...props}
			 />
};

const More = ({project}:{project:Project})=>{
	const {startEdit} = useProjectModal()
	const editProject = (id: number)=> () => startEdit(id)
	const {mutate:deleteProject} = useDeleteProject(useProjectQueryKey())
    const confirmDeleteProject = (id: number)=> {
		Modal.confirm({
			title:'确定要删除这个项目吗？',
			content: '点击确定删除',
			okText:'确定',
			onOk: () =>{
				deleteProject({id})
			}
		})
	}
	return <Dropdown overlay={
		<Menu>
			<Menu.Item key="edit" onClick={editProject(project.id)}>
				编辑
			</Menu.Item>
			<Menu.Item key="delete" onClick={()=>confirmDeleteProject(project.id)}>删除</Menu.Item>
		</Menu>
	}>
		<ButtonNopadding  type="link">...</ButtonNopadding>
	</Dropdown>
}