/*
 * @Descripttion: test
 * @Date: 2021-05-31 14:49:37
 * @LastEditors: love-coding
 * @LastEditTime: 2021-05-31 14:52:30
 */
import * as React from 'react';
import { useUsers } from 'utils/user';
import IdSelect from './id-select';

export const UserSelect = (props:React.ComponentProps<typeof IdSelect>)=>{
    const {data:users} = useUsers();
    return <IdSelect options={users||[]} {...props} />;
}