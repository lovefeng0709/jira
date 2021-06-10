/*
 * @Descripttion: test
 * @Date: 2021-05-11 18:39:23
 * @LastEditors: love-coding
 * @LastEditTime: 2021-06-08 20:53:49
 */
import styled from '@emotion/styled';
import { Spin } from 'antd';
import { ScreenContainer } from 'components/lib';
import  React from 'react';
import { useDocumentTitle } from 'utils';
import { useKanbans } from 'utils/kanban';
import { useTasks } from 'utils/task';
import { CreateKanban } from './create-kanban';
import { KanbanColumn } from './kanban-column';
import { SearchPanel } from './search-panel';
import {   useKanbanSearchParams, useProjectInUrl, useTasksSearchParams } from './util';
 
const KanbanScreen = () => {
    useDocumentTitle('看板列表')
    const {data:currentProject} = useProjectInUrl()
    const { data: kanbans ,isLoading:kanbanIsLoading} = useKanbans(useKanbanSearchParams());
    const { isLoading:taskIsLoading} = useTasks(useTasksSearchParams())
    const isLoading = taskIsLoading ||kanbanIsLoading
    return <ScreenContainer>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel/>
        {
            isLoading? <Spin size={"large"}/>:  <ColumnsContainer>
            {
                kanbans?.map(kanban =><KanbanColumn kanban={kanban} key={kanban.id}/>)
            }
            <CreateKanban/>
            </ColumnsContainer>
        }
    </ScreenContainer>
}
export const ColumnsContainer = styled.div`
    display: flex;
    overflow-x: scroll;
    flex: 1;
`
 
export default KanbanScreen;