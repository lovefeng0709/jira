/*
 * @Descripttion: test
 * @Date: 2021-04-28 15:53:17
 * @LastEditors: love-coding
 * @LastEditTime: 2021-05-10 17:31:54
 */


import { useAuth } from 'context/auth-context';
import {Form,Input} from 'antd'
import React from 'react';
import { LongButton } from 'unauthenticated-app';
import { useAsync } from 'utils/use-async';
const Register = ({onError}:{onError:(error:Error)=>void}) => {
	const {register} = useAuth()
	const {run,isLoading} = useAsync(undefined, { throwOnError: true })
    const handleSubmit=async ({cpassword,...values}:{username:string,password:string,cpassword:string})=>{
		if(cpassword!==values.password){
			onError(new Error('请确认两次输出的密码相同'))
			return
		}
		try {
		  await	run(register(values))
		} catch (error) {
			onError(error)
		}
	}
	return (
		<Form onFinish={handleSubmit}>
			<Form.Item name={'username'}  rules={[{ required: true, message: 'Please input your username!' }]} >
				<Input placeholder={'用户名'} type="text" id="username" />
			</Form.Item>
			<Form.Item name={'password'}   rules={[{ required: true, message: 'Please input your password!' }]} >
				<Input placeholder={'密码'} type="password" id="password" />
			</Form.Item>
			<Form.Item name={'cpassword'}   rules={[{ required: true, message: 'Please input your cpassword!' }]} >
				<Input placeholder={'确认密码'} type="password" id="cpassword" />
			</Form.Item>
			<LongButton loading={isLoading} type="primary" htmlType="submit">注册</LongButton>
		</Form>
	);
};

export default Register;
