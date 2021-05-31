/*
 * @Descripttion: test
 * @Date: 2021-05-30 17:57:33
 * @LastEditors: love-coding
 * @LastEditTime: 2021-05-31 15:01:14
 */
import { Raw } from "types";
import * as React from 'react';
import { Select } from "antd";
type SelectProps = React.ComponentProps<typeof Select>
export interface IdSelectProps extends Omit<SelectProps, 'value'|'onChange'|'options'>  {
    value: Raw | null | undefined,
    onChange: (value?:number) => void,
    defaultOptionName: string,
    options?: {name: string, id: number}[]
}
/**
 * value 可以传入多种类型的值
 * onChange 只会回调 number | undefined 类型
 * 当 idNaN(Number(value))为true的时候，代表选择默认类型
 * 当选择默认类型时，onChange会回调undefined
 * @returns 
 */
const IdSelect = (props:IdSelectProps) => {
    const {value, onChange,defaultOptionName,options,...restProps} = props
    return <Select 
            value={options?.length?toNumber(value):0}
            onChange={value=>onChange(toNumber(value)||undefined)}
            {...restProps}
            >
                {
                    defaultOptionName? <Select.Option value={0}>{defaultOptionName}</Select.Option>:null
                }
                {
                    options?.map(option => <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>)
                }
           </Select>
}
 
export default IdSelect;
const toNumber = (value:unknown)=> isNaN(Number(value))? 0:Number(value)