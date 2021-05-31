/*
 * @Descripttion: test
 * @Date: 2021-05-31 15:59:17
 * @LastEditors: love-coding
 * @LastEditTime: 2021-05-31 16:14:34
 */
import { Rate } from 'antd';
import * as React from 'react';

interface PinProps extends React.ComponentProps<typeof Rate>{
    checked: boolean;
    onCheckedChange?:(checked: boolean)=>void;
}

export const Pin = (props: PinProps)=>{
    const {checked,onCheckedChange,...restPorps} = props
    return <Rate 
            count={1}
            value={checked? 1:0}
            onChange={num=>onCheckedChange?.(!!num)}
            {...restPorps}
         />
}