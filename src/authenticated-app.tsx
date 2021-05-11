/*
 * @Descripttion: test
 * @Date: 2021-04-28 15:52:21
 * @LastEditors: love-coding
 * @LastEditTime: 2021-05-11 12:07:08
 */
import { ProjectListScreen } from 'screens/project-list';
import * as React from 'react';
import { useAuth } from 'context/auth-context';
import styled from '@emotion/styled';
import { Row } from 'components/lib';
import {ReactComponent as Softwarelogo}  from 'assets/software-logo.svg'
import { Button, Dropdown, Menu } from 'antd';
import { useDocumentTitle } from 'utils';
export const AuthenticatedApp = () => {
	const { logout,user } = useAuth();
	useDocumentTitle('项目列表',false);
	return (
		<Container>
			<Header between={true}>
				<HeaderLeft gap={true}>
					<Softwarelogo width={"18rem"} color={'rgb(38,132,255)'}/>
					<h3>项目</h3>
					<h3>用户</h3>
				</HeaderLeft>
				<HeaderRight>
					<Dropdown overlay={<Menu>
						<Menu.Item key={'logout'}>
						<Button type={'link'} onClick={logout}>登出</Button>
						</Menu.Item>
					</Menu>}>
						<Button type={'link'} onClick={e=>e.preventDefault()}>
							Hi,{user?.name}
						</Button>
					</Dropdown>
				</HeaderRight>
			</Header>
			<Main>
				<ProjectListScreen />
			</Main>
		</Container>
	);
};
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
padding:3.2rem;
box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
z-index:1;
`;
const HeaderLeft = styled(Row)`
`;
const HeaderRight = styled.div``;
const Main = styled.main`
`;
