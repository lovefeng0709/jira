/*
 * @Descripttion: test
 * @Date: 2021-04-26 16:42:15
 * @LastEditors: love-coding
 * @LastEditTime: 2021-05-30 16:04:50
 */

/* @jsxImportSource @emotion/react */
import { Form, Input, Select } from 'antd';
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
		<Form css={{marginBottom: '2rem'}} layout={'inline'}>
			<Form.Item>
				<Input type="text"
				placeholder={'项目名'}
					value={param.name}
					onChange={(e) => {
						setParam({
							...param,
							name: e.target.value
						});
				      }}  
				/>
			</Form.Item>
			<Form.Item>
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
						<Select.Option  value={String(user.id)} key={user.id}>
							{user.name}
						</Select.Option >
					   ))}
				</Select>
			</Form.Item>
		</Form>
	);
};
