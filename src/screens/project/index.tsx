/*
 * @Descripttion: test
 * @Date: 2021-05-11 15:22:54
 * @LastEditors: love-coding
 * @LastEditTime: 2021-06-08 15:08:36
 */
import * as React from 'react';
import { Link } from 'react-router-dom';
import {Routes,Route,Navigate, useLocation} from 'react-router'
import KanbanScreen from 'screens/Kanban';
import {EpicScreen} from 'screens/Epic';
import styled from '@emotion/styled';
import { Menu } from 'antd';
const useRouteType = ()=>{
    const units = useLocation().pathname.split('/')
    return units[units.length-1]
}

const  ProjectScreen = () => {
    const routeType = useRouteType() 
    return <Container>
                <Aside>
                    <Menu mode={'inline'} selectedKeys={[routeType]}>
                        <Menu.Item key={'kanban'}>
                            <Link to={'kanban'}>看板</Link>
                        </Menu.Item>
                        <Menu.Item key={'epic'}>
                           <Link to={'epic'}>任务组</Link>
                        </Menu.Item>
                    </Menu>
                </Aside>
                <Main>
                    <Routes>
                        {/* projects/:projectId/kanban */}
                        <Route path={'/kanban'} element={<KanbanScreen />} />
                        {/* projects/:projectId/epic */}
                        <Route path={'/epic'} element={<EpicScreen />} />
                        <Navigate to={window.location.pathname +'/kanban'} replace={true}/>            
                    </Routes>
                </Main>
            </Container>;
}
const Aside = styled.div`
    background-color: rgb(244,245,247);
    display:flex;
`
const Main = styled.div`
    box-shadow: -5px 0 5px -5px rgb(0,0,0,0.1);
    display: flex;
    overflow: hidden;
`
const Container = styled.div`
    display: grid;
    grid-template-columns: 16rem 1fr;
    overflow: hidden;
    width: 100%;

`
export default ProjectScreen;