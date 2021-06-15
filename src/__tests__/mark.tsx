import React from 'react'

import {render,screen} from "@testing-library/react"
import { Mark } from 'components/mark';

test("Mark 组件正确高亮关键字",()=>{
    const name = "物料管理";
    const keyWord = "管理";
    render(<Mark name={name} keyWord={keyWord}/>);
    expect(screen.getByText(keyWord)).toBeInTheDocument();
    expect(screen.getByText(keyWord)).toHaveStyle("color:#257AFD")
    expect(screen.getByText("物料")).not.toHaveStyle("color:#257AFD")
})