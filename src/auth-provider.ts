/*
 * @Descripttion: test
 * @Date: 2021-04-27 21:46:26
 * @LastEditors: love-coding
 * @LastEditTime: 2021-04-27 22:02:50
 */
// 定义一些函数 帮助操控jwt的token

import { User } from 'screens/project-list/search-panel';
const apiUrl = process.env.REACT_APP_API_URL;
// 在真实环境中，如果使用firebase或auth0这种第三方auth服务的话，本文件不需要开发者开发
const localStorageKey = '__auth_provider_token__';

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: User }) => {
	window.localStorage.setItem(localStorageKey, user.token || '');
	return user;
};
export const login = (data: { username: string; password: string }) => {
	fetch(`${apiUrl}/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).then(async (response) => {
		if (response.ok) {
			return handleUserResponse(await response.json());
		}
	});
};
export const register = (data: { username: string; password: string }) => {
	fetch(`${apiUrl}/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).then(async (response) => {
		if (response.ok) {
			return handleUserResponse(await response.json());
		}
	});
};
export const logout = () => window.localStorage.removeItem(localStorageKey)
