/*
 * @Descripttion: test
 * @Date: 2021-04-27 19:06:42
 * @LastEditors: love-coding
 * @LastEditTime: 2021-04-27 21:42:47
 */
import React, { FormEvent} from 'react';
const apiUrl = process.env.REACT_APP_API_URL;
const Login = () => {
	const login = (param:{username:string, password:string})=>{
		// 注册使用 /register
		fetch(`${apiUrl}/login`,{
			method: 'POST',
			headers: {
				"Content-Type":"application/json"
			},
			body: JSON.stringify(param)
		}).then(async (response) => {
			if (response.ok) {
				
			}
		});
	}
    const handleSubmit=(event:FormEvent<HTMLFormElement>)=>{
		event.preventDefault();
		const username = (event.currentTarget.elements[0] as HTMLInputElement).value
		const password = (event.currentTarget.elements[1] as HTMLInputElement).value
		login({username,password})
	}
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="username">用户名</label>
				<input type="text" id="username" />
			</div>
			<div>
				<label htmlFor="password">密码</label>
				<input type="password" name="" id="password" />
			</div>
			<button type="submit">登录</button>
		</form>
	);
};

export default Login;
