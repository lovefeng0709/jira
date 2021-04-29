/*
 * @Descripttion: test
 * @Date: 2021-04-28 15:53:17
 * @LastEditors: love-coding
 * @LastEditTime: 2021-04-29 08:08:05
 */


import { useAuth } from 'context/auth-context';
import {Form,Input} from 'antd'
import React from 'react';
import { LongButton } from 'unauthenticated-app';
const Register = () => {
	const {register} = useAuth()
    const handleSubmit=(values:{username:string,password:string})=>{
		register(values)
	}
	return (
		<Form onFinish={handleSubmit}>
			<Form.Item name={'username'}  rules={[{ required: true, message: 'Please input your username!' }]} >
				<Input placeholder={'用户名'} type="text" id="username" />
			</Form.Item>
			<Form.Item name={'password'}   rules={[{ required: true, message: 'Please input your password!' }]} >
				<Input placeholder={'密码'} type="password" id="password" />
			</Form.Item>
			<LongButton type="primary" htmlType="submit">注册</LongButton>
		</Form>
	);
};

export default Register;
