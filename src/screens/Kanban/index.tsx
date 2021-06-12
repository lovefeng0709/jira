/*
 * @Descripttion: test
 * @Date: 2021-05-11 18:39:23
 * @LastEditors: love-coding
 * @LastEditTime: 2021-06-08 20:53:49
 */
import styled from '@emotion/styled';
import { Spin } from 'antd';
import { Drag, Drop, DropChild } from 'components/drag-and-drop';
import { ScreenContainer } from 'components/lib';
import  React, { useCallback } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useDocumentTitle } from 'utils';
import { useKanbans, useReorderKanban } from 'utils/kanban';
import { useReorderTask, useTasks } from 'utils/task';
import { CreateKanban } from './create-kanban';
import { KanbanColumn } from './kanban-column';
import { SearchPanel } from './search-panel';
import { TaskModal } from './task-modal';
import {   useKanbanSearchParams,   useKanbansQueryKey,   useProjectInUrl, useTasksQueryKey, useTasksSearchParams } from './util';
 
const KanbanScreen = () => {
    useDocumentTitle('看板列表')
    const {data:currentProject} = useProjectInUrl()
    const { data: kanbans ,isLoading:kanbanIsLoading} = useKanbans(useKanbanSearchParams());
    const { isLoading:taskIsLoading} = useTasks(useTasksSearchParams())
    const isLoading = taskIsLoading ||kanbanIsLoading
    const onDragEnd =useDragEnd()
    return <DragDropContext onDragEnd={onDragEnd}>
                <ScreenContainer>
                <h1>{currentProject?.name}看板</h1>
                <SearchPanel/>
                {
                    isLoading? <Spin size={"large"}/>:  (
                        <ColumnsContainer>
                            <Drop type={'COLUMN'} direction={"horizontal"} droppableId={'kanban'}>
                                <DropChild style={{display: 'flex'}}>
                                    
                                    {
                                        kanbans?.map((kanban, index)=><Drag key={kanban.id} draggableId={'kanban'+kanban.id} index={index}>
                                            <KanbanColumn kanban={kanban} key={kanban.id}/>
                                        </Drag>)
                                    }
                                </DropChild>
                               
                            </Drop>
                            <CreateKanban/>
                         </ColumnsContainer>
                    )
                }
                <TaskModal/>
            </ScreenContainer>
    </DragDropContext>
}
export const useDragEnd = ()=>{
    const {data: kanbans} =useKanbans(useKanbanSearchParams())
    const {mutate:reorderKanban } = useReorderKanban(useKanbansQueryKey())
    const {mutate:reorderTask } = useReorderTask(useTasksQueryKey())
    const {data:allTasks=[] } = useTasks(useTasksSearchParams())
    return useCallback(({source,destination,type}:DropResult)=>{
       console.log(type)
        if(!destination){
            return
        }
        // 看板排序
        if(type==='COLUMN'){
            const fromId = kanbans?.[source.index].id
            const toId = kanbans?.[destination.index].id
            if(!fromId|| !toId || fromId===toId){
                return
            }
            const type = source.index > destination.index? 'before' : 'after'
            console.log(type)
            reorderKanban({
                fromId,
                referenceId: toId,
                type
            })
        }
        // task排序
        if(type==='ROW'){
           const fromKanbanId = +source.droppableId
           const toKanbanId = +destination.droppableId
           //  如果不是一个看板内的task移动
           if(fromKanbanId===toKanbanId){
               return
           }
           const fromTask =allTasks.filter(task=>task.kanbanId===fromKanbanId)[source.index]
           const toTask =allTasks.filter(task=>task.kanbanId===toKanbanId)[destination.index]
           if(fromTask?.id===toTask?.id){
               return
           }
          //   
          reorderTask({
              fromId: fromTask?.id,
              referenceId:toTask?.id,
              fromKanbanId,
              toKanbanId,
              type:fromKanbanId===toKanbanId && source.index>destination.index?'before':'after'
          }) 
        }

    },[kanbans,reorderKanban,allTasks,reorderTask])
}

export const ColumnsContainer = styled('div')`
    display: flex;
    overflow-x: scroll;
    flex: 1;
`
 
export default KanbanScreen;