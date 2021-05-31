/*
 * @Descripttion: test
 * @Date: 2021-04-26 16:42:15
 * @LastEditors: love-coding
 * @LastEditTime: 2021-05-31 14:54:39
 */

/* @jsxImportSource @emotion/react */
import { Form, Input, Select } from 'antd';
import { UserSelect } from 'components/user-select';
import React from 'react';
import { Project } from './list';
export interface User {
	id: number;
	name: string;
	email: string;
	title: string;
	organization: string;
	token: string;
}
interface SearchPanelProps {
	users: User[],
	param:Partial<Pick<Project,'name'|'personId'>>
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
				<UserSelect 
				  value={param.personId} 
				  onChange={(value) =>
						setParam({
							...param,
							personId: value
				  })} 
				  defaultOptionName={'负责人'}
				/>	
			</Form.Item>
		</Form>
	);
};
