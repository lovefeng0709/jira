/*
 * @Descripttion: test
 * @Date: 2021-05-11 15:22:54
 * @LastEditors: love-coding
 * @LastEditTime: 2021-06-08 15:08:36
 */
import * as React from 'react';
import { Link } from 'react-router-dom';
import {Routes,Route,Navigate} from 'react-router'
import KanbanScreen from 'screens/Kanban';
import EpicScreen from 'screens/Epic';
const  ProjectScreen = () => {
    return <div>
                <h1>ProjectScreen</h1>
                <Link to={'kanban'}>看板</Link>
                <Link to={'epic'}>任务组</Link>
                <Routes>
                    {/* projects/:projectId/kanban */}
                    <Route path={'/kanban'} element={<KanbanScreen />} />
                    {/* projects/:projectId/epic */}
                    <Route path={'/epic'} element={<EpicScreen />} />
                    <Navigate to={window.location.pathname +'/kanban'} replace={true}/>            
                </Routes>
            </div>;
}
 
export default ProjectScreen;