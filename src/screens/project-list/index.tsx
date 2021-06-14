/*
 * @Descripttion: test
 * @Date: 2021-04-26 16:39:11
 * @LastEditors: love-coding
 * @LastEditTime: 2021-06-07 09:43:55
 */
import React from 'react';
import { List} from './list';
import { SearchPanel } from './search-panel';
import {useDebounce, useDocumentTitle} from 'utils';
import { useProjects } from 'utils/project';
import { useUsers } from 'utils/user';
import { useProjectModal, useProjectsSearchParams } from './util';
import { ButtonNopadding, ErrorBox, Row, ScreenContainer } from 'components/lib';
import { Profiler } from 'components/profiler';


export const ProjectListScreen = () => {
	useDocumentTitle('项目列表',false);
	//const [keys] = useState<('name'|'personId')[]>(['name', 'personId'])
	// useDebounce 自定义hooks
	const {open} =useProjectModal()
	const [param,setParam] = useProjectsSearchParams()
	const {isLoading,error,data:list} = useProjects(useDebounce(param,200))
	const {data:users} = useUsers()
	return (
		<Profiler id={'项目列表'}>
			<ScreenContainer>
				<Row between={true}>
				<h1>项目列表</h1>
				<ButtonNopadding  type="link" onClick={open}>
					创建项目
				</ButtonNopadding>
				</Row>
				
				<SearchPanel param={param} users={users||[]} setParam={setParam} />
				<ErrorBox error={error} />
				<List   loading={isLoading} dataSource={list||[]} users={users||[]} />
			</ScreenContainer>
		</Profiler>
		
	);
};

ProjectListScreen.whyDidYouRender = false
