/*
 * @Descripttion: test
 * @Date: 2021-04-26 16:39:11
 * @LastEditors: love-coding
 * @LastEditTime: 2021-04-27 13:55:47
 */
import React, { useState, useEffect } from 'react';
import { List } from './list';
import { SearchPanel } from './search-panel';
import {cleanObject,useDebounce} from 'utils';
import * as qs from 'qs';

// baseUrl
const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
	const [ param, setParam ] = useState({
		name: '',
		personId: ''
	});
	const [ users, setUsers ] = useState([]);
	const [ list, setList ] = useState([]);
	// useDebounce 自定义hook
	const debounceParam = useDebounce(param,500)

	useEffect(
		() => {
			fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async (response) => {
				if (response.ok) {
					setList(await response.json());
				}
			});
		},
		[ debounceParam ]
	);

	useEffect(() => {
		fetch(`${apiUrl}/users`).then(async (response) => {
			if (response.ok) {
				setUsers(await response.json());
			}
		});
	}, []);

	return (
		<div>
			<SearchPanel param={param} users={users} setParam={setParam} />
			<List list={list} users={users} />
		</div>
	);
};
