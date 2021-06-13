/*
 * @Descripttion: test
 * @Date: 2021-05-08 20:59:19
 * @LastEditors: love-coding
 * @LastEditTime: 2021-06-07 09:29:50
 */
import styled from '@emotion/styled';
import { Button, Spin, Typography } from 'antd';
import { DevTools } from 'jira-dev-tool';
import React from 'react';

export const Row = styled.div<{
    gap?: number | boolean;
    between?: boolean,
    marginBottom?: number
}>`
    display: flex;
    align-items: center;
    justify-content: ${props=> props.between? 'space-between':undefined};
    margin-bottom: ${props=> props.marginBottom+'rem'};
    > * {
        margin-top: 0!important;
        margin-bottom: 0!important;
        margin-right: ${props=> typeof props.gap=== 'number'?props.gap + 'rem':props.gap?'2rem':undefined};
    }
`;
const FullPage = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const FullPageLoading = ()=> <FullPage>
    <Spin size={"large"}/>
</FullPage>

export const FullPageErrorFallback = ({error}:{ error:Error| null}) =><FullPage>
    <DevTools/>
    <ErrorBox error={error}></ErrorBox>
</FullPage>

export const ButtonNopadding = styled(Button)`
   padding: 0;
`
// 类型守卫 当符合value.message value就是Error类型
const  isError = (value:any): value is Error => value?.message

export const ErrorBox = ({error}:{ error:unknown}) =>{
  if(isError(error)){
    return <Typography.Text type="danger">{error?.message}</Typography.Text>
  }
  return null
}

export const ScreenContainer = styled.div`
  padding: 3.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`