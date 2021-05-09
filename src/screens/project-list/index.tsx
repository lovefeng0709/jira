/*
 * @Descripttion: test
 * @Date: 2021-04-26 16:39:11
 * @LastEditors: love-coding
 * @LastEditTime: 2021-05-09 18:02:09
 */
import React, { useState, useEffect } from 'react';
import { List } from './list';
import { SearchPanel } from './search-panel';
import {cleanObject,useDebounce} from 'utils';
import { useHttp } from 'utils/http';
import styled from '@emotion/styled';


export const ProjectListScreen = () => {
	const [ param, setParam ] = useState({
		name: '',
		personId: ''
	});
	const [ users, setUsers ] = useState([]);
	const [ list, setList ] = useState([]);
	// useDebounce 自定义hook
	const debounceParam = useDebounce(param,500)
    const client = useHttp()
	useEffect(
		() => {
			client('projects',{data:cleanObject(debounceParam)}).then(setList)
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ debounceParam ]
	);

	useEffect(() => {
		client('users').then(setUsers)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Container>
			<SearchPanel param={param} users={users} setParam={setParam} />
			<List list={list} users={users} />
		</Container>
	);
};
const Container = styled.div`
	padding: 3.2rem
`