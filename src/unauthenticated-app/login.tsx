/*
 * @Descripttion: test
 * @Date: 2021-04-28 15:53:09
 * @LastEditors: love-coding
 * @LastEditTime: 2021-04-29 08:07:40
 */

import { useAuth } from 'context/auth-context';
import {Form,Input} from 'antd'
import React from 'react';
import { LongButton } from 'unauthenticated-app';
const Login = () => {
	const {login} = useAuth()
    const handleSubmit=(values:{username:string,password:string})=>{
		login(values)
	}
	return (
		<Form onFinish={handleSubmit}>
			<Form.Item name={'username'}  rules={[{ required: true, message: 'Please input your username!' }]} >
				<Input placeholder={'用户名'} type="text" id="username" />
			</Form.Item>
			<Form.Item name={'password'}  rules={[{ required: true, message: 'Please input your password!' }]} >
				<Input placeholder={'密码'} type="password" id="password" />
			</Form.Item>
			<LongButton type="primary" htmlType="submit">登录</LongButton>
		</Form>
	);
};

export default Login;
