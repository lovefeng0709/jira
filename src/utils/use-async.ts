import { useState } from "react";

/*
 * @Descripttion: test
 * @Date: 2021-05-09 20:58:34
 * @LastEditors: love-coding
 * @LastEditTime: 2021-05-10 12:49:02
 */
interface State<D> {
    error: Error | null;
    data: D | null;
    stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
    stat: 'idle',
    data: null,
    error: null
}
export const useAsync =<D> (initialState?: State<D>)=>{
    const [state, setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initialState
    });
    const setError = (error: Error)=>setState({
        error,
        stat:'error',
        data: null
    })
    const setData = (data: D)=>setState({
        error:null,
        data:data,
        stat: 'success'
    })
    // run 用于触发异步请求
    const run =(promise:Promise<D>)=>{
        if(!promise||!promise.then){
            throw new Error('请传入 Promise 类型数据')
        }
        setState({...state,stat:'loading'})
        return promise
            .then(data=>{
                setData(data)
                return data
            })
            .catch(error=>{
                setError(error)
                return error
            })
    }
    return { 
        isIdle: state.stat === 'idle',
        isLoading : state.stat === 'loading',
        isError : state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        setData,
        setError,
        ...state
    }
}