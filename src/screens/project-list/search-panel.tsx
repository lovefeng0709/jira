/*
 * @Descripttion: test
 * @Date: 2021-04-26 16:42:15
 * @LastEditors: love-coding
 * @LastEditTime: 2021-04-28 21:45:54
 */
import { Input, Select } from 'antd';
import React from 'react';
export interface User {
	id: string;
	name: string;
	email: string;
	title: string;
	organization: string;
	token: string;
}
interface SearchPanelProps {
	param:{
		name: string;
		personId:string;
	},
	users: User[],
	setParam:(param:SearchPanelProps['param'])=>void;
}
export const SearchPanel = ({ param, users, setParam }:SearchPanelProps) => {
	return (
		<form>
			<div>
				<Input type="text"
					value={param.name}
					onChange={(e) => {
						setParam({
							...param,
							name: e.target.value
						});
				      }}  
				/>
				<Select
					value={param.personId}
					onChange={(value) =>
						setParam({
							...param,
							personId: value
						})}
				     >
					  <Select.Option value="">负责人</Select.Option >
					  {users.map((user) => (
						<Select.Option  value={user.id} key={user.id}>
							{user.name}
						</Select.Option >
					   ))}
				</Select>
			</div>
		</form>
	);
};
