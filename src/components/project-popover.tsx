/*
 * @Descripttion: test
 * @Date: 2021-06-01 21:04:05
 * @LastEditors: love-coding
 * @LastEditTime: 2021-06-06 19:07:02
 */
import styled from '@emotion/styled';
import {  Divider, List, Popover, Typography } from 'antd';
import * as React from 'react';
import { useProjectModal } from 'screens/project-list/util';
import { useProjects } from 'utils/project';
import { ButtonNopadding } from './lib';

export const ProjectPopover = () =>{
    const {open} = useProjectModal()
    const {data:projects} = useProjects()
    const pinnedProjects = projects?.filter(project => project.pin)
    const content = <ContentContainer>
        <Typography.Text type="secondary">收藏项目</Typography.Text>
        <List>
          {
              pinnedProjects?.map(project =><List.Item key={project.id}>
                  <List.Item.Meta title={project.name}/>
              </List.Item>)
          }  
        </List>
        <Divider/>
        <ButtonNopadding  type={'link'} onClick={open}>
          创建项目
		</ButtonNopadding>
    </ContentContainer>
    return <Popover placement="bottom" content={content}>
       <span> 项目</span>
    </Popover>
}
const ContentContainer = styled.div`
    min-width: 30rem;
`