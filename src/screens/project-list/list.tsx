/*
 * @Descripttion: test
 * @Date: 2021-04-26 16:41:03
 * @LastEditors: love-coding
 * @LastEditTime: 2021-04-29 06:56:22
 */
import React from 'react';
import { User } from './search-panel';
import {Table} from 'antd'
interface Project {
	id: string;
	name: string;
	personId: string;
	pin: boolean;
	organization: string;
}
interface ListProps {
	list:Project[],
	users:User[]
}

export const List = ({ list, users }:ListProps) => {
	const columns = [
	      {
			title: '名称',
			dataIndex:'name',
			sorter:(a:Project,b:Project)=>a.name.localeCompare(b.name)
	      },
		  {
			title: '负责人',
		     render:(value:string,project:Project)=>(<span>{users.find(user=>user.id === project.personId)?.name||'未知'}</span>)
	      }
        ]
	return <Table 
	         rowKey={"id"}
	         pagination={false} 
			 columns={columns} 
			 dataSource={list}
			 />
};
