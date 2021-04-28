/*
 * @Descripttion: test
 * @Date: 2021-04-28 15:53:09
 * @LastEditors: love-coding
 * @LastEditTime: 2021-04-28 20:47:32
 */

import { useAuth } from 'context/auth-context';
import {Form,Input,Button} from 'antd'
import React from 'react';
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
			<Button type="primary" htmlType="submit">登录</Button>
		</Form>
	);
};

export default Login;
