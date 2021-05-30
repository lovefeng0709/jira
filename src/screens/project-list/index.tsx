/*
 * @Descripttion: test
 * @Date: 2021-04-26 16:39:11
 * @LastEditors: love-coding
 * @LastEditTime: 2021-05-30 16:48:52
 */
import React from 'react';
import { List} from './list';
import { SearchPanel } from './search-panel';
import {useDebounce} from 'utils';
import styled from '@emotion/styled';
import { Typography } from 'antd';
import { useProjects } from 'utils/project';
import { useUsers } from 'utils/user';
import { useUrlQueryParam } from 'utils/url';


export const ProjectListScreen = () => {
	
	//const [keys] = useState<('name'|'personId')[]>(['name', 'personId'])
	const [param,setParam]= useUrlQueryParam(['name', 'personId'])
	// useDebounce 自定义hook
	const debounceParam = useDebounce(param,500)

	const {isLoading,error,data:list} = useProjects(debounceParam)
	const {data:users} = useUsers()
	

	return (
		<Container>
			<h1>项目列表</h1>
			<SearchPanel param={param} users={users||[]} setParam={setParam} />
			{error? <Typography.Text type="danger">{error.message}</Typography.Text>:null}
			<List loading={isLoading} dataSource={list||[]} users={users||[]} />
		</Container>
	);
};

ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
	padding: 3.2rem
`