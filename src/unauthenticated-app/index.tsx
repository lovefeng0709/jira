/*
 * @Descripttion: test
 * @Date: 2021-04-28 15:52:58
 * @LastEditors: love-coding
 * @LastEditTime: 2021-04-28 20:46:50
 */
import { useState } from 'react';
import Login from './login';
import Register from './register';
import {Card} from 'antd'
export const UnauthenticatedAPP = () => {
	const [ isRegister, setIsRegister ] = useState(false);

	return (
		<div style={{display: 'flex',justifyContent: 'center'}}>
			<Card>
			{isRegister ? <Register /> : <Login />}
			<button onClick={() => setIsRegister(!isRegister)}>切换到{isRegister ? '登录' : '注册'}状态</button>	
			</Card>
			
		</div>
	);
};
