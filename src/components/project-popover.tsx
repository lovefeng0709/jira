/*
 * @Descripttion: test
 * @Date: 2021-06-01 21:04:05
 * @LastEditors: love-coding
 * @LastEditTime: 2021-06-02 13:17:58
 */
import styled from '@emotion/styled';
import { Button, Divider, List, Popover, Typography } from 'antd';
import * as React from 'react';
import { useProjects } from 'utils/project';
import { ButtonNopadding } from './lib';

export const ProjectPopover = (props:{setProjectModalOpen:(isOpen:boolean)=>void}) =>{
    const {data:projects,isLoading} = useProjects()
    const pinnedProjects = projects?.filter(project => project.pin)
    const content = <ContentContainer>
        <Typography.Text type="secondary">收藏项目</Typography.Text>
        <List>
          {
              pinnedProjects?.map(project =><List.Item>
                  <List.Item.Meta title={project.name}/>
              </List.Item>)
          }  
        </List>
        <Divider/>
        <ButtonNopadding type="link" onClick={()=>props.setProjectModalOpen(true)}>创建项目</ButtonNopadding>
    </ContentContainer>
    return <Popover placement="bottom" content={content}>
       <span> 项目</span>
    </Popover>
}
const ContentContainer = styled.div`
    min-width: 30rem;
`