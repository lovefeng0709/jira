/*
 * @Descripttion: test
 * @Date: 2021-04-26 16:41:03
 * @LastEditors: love-coding
 * @LastEditTime: 2021-04-27 13:44:44
 */
import React from 'react';
import { User } from './search-panel';
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
	return (
		<table>
			<thead>
				<tr>
					<th>名称</th>
					<th>负责人</th>
				</tr>
			</thead>
			<tbody>
				{list.map((project) => (
					<tr key={project.id}>
						<td>{project.name}</td>
                        {/* undefined.name 会报错 使用可选链 ？. 会使整个都变undefined 所以用 ||'未知' */}
						<td>{users.find(user=>user.id === project.personId)?.name||'未知'}</td>
					</tr>
				))}
			</tbody>
		</table> 
	);
};
