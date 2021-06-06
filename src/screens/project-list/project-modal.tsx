/*
 * @Descripttion: test
 * @Date: 2021-06-01 19:55:57
 * @LastEditors: love-coding
 * @LastEditTime: 2021-06-06 19:16:26
 */
import { Drawer } from 'antd';
import * as React from 'react';
import { useProjectModal } from './util';

export  const ProjectModal = () => {
  const {projectModalOpen,close} =useProjectModal()
    return <Drawer onClose={close} visible={projectModalOpen} width={'100%'}>
            <h1>project Modal</h1>
          </Drawer>
}
 
