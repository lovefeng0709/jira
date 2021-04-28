/*
 * @Descripttion: test
 * @Date: 2021-04-28 15:53:17
 * @LastEditors: love-coding
 * @LastEditTime: 2021-04-28 16:25:45
 */


import { useAuth } from 'context/auth-context';
import React, { FormEvent} from 'react';

const Register = () => {
	const {register} = useAuth()
    const handleSubmit=(event:FormEvent<HTMLFormElement>)=>{
		event.preventDefault();
		const username = (event.currentTarget.elements[0] as HTMLInputElement).value
		const password = (event.currentTarget.elements[1] as HTMLInputElement).value
		register({username,password})
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
			<button type="submit">注册</button>
		</form>
	);
};

export default 	Register;
