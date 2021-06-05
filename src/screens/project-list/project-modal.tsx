/*
 * @Descripttion: test
 * @Date: 2021-06-01 19:55:57
 * @LastEditors: love-coding
 * @LastEditTime: 2021-06-04 17:57:45
 */
import { Drawer } from 'antd';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { projectListActions, selectProjectModalOpen } from './project-list.slice';

export  const ProjectModal = () => {
  const dispatch = useDispatch()
  const projectModalOpen = useSelector(selectProjectModalOpen)
    return <Drawer onClose={()=>dispatch(projectListActions.closeProjectModal())} visible={projectModalOpen} width={'100%'}>
            <h1>project Modal</h1>
          </Drawer>
}
 
