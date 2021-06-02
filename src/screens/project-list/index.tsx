/*
 * @Descripttion: test
 * @Date: 2021-04-26 16:39:11
 * @LastEditors: love-coding
 * @LastEditTime: 2021-06-02 16:25:51
 */
import React from 'react';
import { List} from './list';
import { SearchPanel } from './search-panel';
import {useDebounce, useDocumentTitle} from 'utils';
import styled from '@emotion/styled';
import {  Typography } from 'antd';
import { useProjects } from 'utils/project';
import { useUsers } from 'utils/user';
import { useProjectsSearchParams } from './util';
import { Row } from 'components/lib';


export const ProjectListScreen = (props:{projectButton:JSX.Element}) => {
	useDocumentTitle('项目列表',false);
	//const [keys] = useState<('name'|'personId')[]>(['name', 'personId'])
	// useDebounce 自定义hooks
	const [param,setParam] = useProjectsSearchParams()
	const {isLoading,error,data:list,retry} = useProjects(useDebounce(param,200))
	const {data:users} = useUsers()
	return (
		<Container>
			<Row between={true}>
			  <h1>项目列表</h1>
			 {
				 props.projectButton
			 }
			</Row>
			
			<SearchPanel param={param} users={users||[]} setParam={setParam} />
			{error? <Typography.Text type="danger">{error.message}</Typography.Text>:null}
			<List {...props} refresh={retry} loading={isLoading} dataSource={list||[]} users={users||[]} />
		</Container>
	);
};

ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
	padding: 3.2rem
`