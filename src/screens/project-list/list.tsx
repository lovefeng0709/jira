/*
 * @Descripttion: test
 * @Date: 2021-04-26 16:41:03
 * @LastEditors: love-coding
 * @LastEditTime: 2021-05-10 11:27:06
 */
import React from 'react';
import { User } from './search-panel';
import {Table, TableProps} from 'antd'
import dayjs from 'dayjs'
export interface Project {
	id: string;
	name: string;
	personId: string;
	pin: boolean;
	organization: string;
	created: number;
}
interface ListProps extends TableProps<Project>{
	users:User[]
}

export const List = ({  users,...props }:ListProps) => {
	const columns = [
	      {
			title: '名称',
			dataIndex:'name',
			sorter:(a:Project,b:Project)=>a.name.localeCompare(b.name)
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
	      }
        ]
	return <Table 
	         rowKey={"id"}
	         pagination={false} 
			 columns={columns} 
			 {...props}
			 />
};
