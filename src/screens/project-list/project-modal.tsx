/*
 * @Descripttion: test
 * @Date: 2021-06-01 19:55:57
 * @LastEditors: love-coding
 * @LastEditTime: 2021-06-01 20:10:38
 */
import { Drawer } from 'antd';
import * as React from 'react';

export  const ProjectModal = (props:{projectModalOpen:boolean,onClose:() => void}) => {
    return <Drawer onClose={() =>props.onClose()} visible={props.projectModalOpen} width={'100%'}>
            <h1>project Modal</h1>
          </Drawer>
}
 
