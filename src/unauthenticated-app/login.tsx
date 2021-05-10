/*
 * @Descripttion: test
 * @Date: 2021-04-28 15:53:09
 * @LastEditors: love-coding
 * @LastEditTime: 2021-05-10 17:30:44
 */

import { useAuth } from 'context/auth-context';
import {Form,Input} from 'antd'
import React from 'react';
import { LongButton } from 'unauthenticated-app';
import { useAsync } from 'utils/use-async';
const Login = ({onError}:{onError:(error:Error)=>void}) => {
	const {login} = useAuth()
	const {run,isLoading} = useAsync(undefined, { throwOnError: true })
    const handleSubmit=async (values:{username:string,password:string})=>{
		try {
		   await run(login(values))
		} catch (error) {
			onError(error)
		}
	}
	return (
		<Form onFinish={handleSubmit}>
			<Form.Item name={'username'}  rules={[{ required: true, message: 'Please input your username!' }]} >
				<Input placeholder={'用户名'} type="text" id="username" />
			</Form.Item>
			<Form.Item name={'password'}  rules={[{ required: true, message: 'Please input your password!' }]} >
				<Input placeholder={'密码'} type="password" id="password" />
			</Form.Item>
			<LongButton loading={isLoading} type="primary"  htmlType="submit">登录</LongButton>
		</Form>
	);
};

export default Login;
