/*
 * @Descripttion: test
 * @Date: 2021-05-10 19:50:00
 * @LastEditors: love-coding
 * @LastEditTime: 2021-05-10 20:14:02
 */
// react 错误边界  对渲染错误进行兜底
import React from "react";

type FallbackRender = (props:{error:Error | null})=> React.ReactElement

// export interface Props {
//     children: React.ReactNode,
//     fallbackRender: FallbackRender
// }
 
// export interface State {
//     error: Error | null
// }
 // https://github.com/bvaughn/react-error-boundary
class ErrorBoundary extends React.Component<React.PropsWithChildren<{fallbackRender: FallbackRender}>, {error: Error | null}> {
    state = { error:null  }
    // 当子组件抛出异常，这里就会接受并且调用
    static getDerivedStateFromError(error:Error){
        return { error}
    }
    render() { 
        const {error} = this.state;
        const {fallbackRender,children} = this.props
        if(error){
            return fallbackRender({error})
        }
        return children;
    }
}
 
export default ErrorBoundary;