/*
 * @Descripttion: test
 * @Date: 2021-04-26 16:41:03
 * @LastEditors: love-coding
 * @LastEditTime: 2021-06-02 13:35:02
 */
import React from 'react';
import { User } from './search-panel';
import {Dropdown, Menu, Table, TableProps} from 'antd'
import dayjs from 'dayjs'
import {  Link } from 'react-router-dom';
import { Pin } from 'components/pin';
import { useEditProject } from 'utils/project';
import { ButtonNopadding } from 'components/lib';
export interface Project {
	id: number;
	name: string;
	personId: number;
	pin: boolean;
	organization: string;
	created: number;
}
interface ListProps extends TableProps<Project>{
	users:User[],
	refresh?:()=>void;
	setProjectModalOpen:(isOpen:boolean)=>void;
}

export const List = ({  users,...props }:ListProps) => {
	const {mutate} = useEditProject()
	// 柯里化
	const pinProject = (id: number)=>(pin: boolean)=> mutate({id,pin}).then(props.refresh)
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
			  render:(value:string,project:Project)=>{
				return <Dropdown overlay={
					<Menu>
						<Menu.Item key="edit">
							<ButtonNopadding type="link" onClick={()=>props.setProjectModalOpen(true)}>编辑</ButtonNopadding>
						</Menu.Item>
					</Menu>
				}>
					<ButtonNopadding  type="link">...</ButtonNopadding>
				</Dropdown>
			  }
		  }
        ]
	return <Table 
	         rowKey={"id"}
	         pagination={false} 
			 columns={columns} 
			 {...props}
			 />
};
