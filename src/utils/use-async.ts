import { useCallback, useState } from "react";
import { useMountedRef } from "utils";

/*
 * @Descripttion: test
 * @Date: 2021-05-09 20:58:34
 * @LastEditors: love-coding
 * @LastEditTime: 2021-06-01 16:33:39
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
const defaultConfig = {
    throwOnError:false
}
export const useAsync =<D> (initialState?: State<D>,initialConfig?:typeof defaultConfig)=>{
   const config = {...defaultConfig,...initialConfig}
    const [state, setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initialState
    });
    // 刷新操作
    // useState直接传入函数的含义是：惰性初始化；所以，要用useState保存函数，不能直接传入函数
    const [retry,setRetry] = useState(()=>()=>{
    })
    const mountedRef = useMountedRef()
    const setError = useCallback((error: Error)=>setState({
        error,
        stat:'error',
        data: null
    }),[])
    const setData = useCallback((data: D)=>setState({
        error:null,
        data:data,
        stat: 'success'
    }),[])
    // run 用于触发异步请求
    const run = useCallback((promise:Promise<D>,runConfig?:{retry:()=>Promise<D>})=>{
        if(!promise||!promise.then){
            throw new Error('请传入 Promise 类型数据')
        }
        //
        setRetry(()=>()=>{
            if(runConfig?.retry){
                run(runConfig?.retry(),runConfig)
            }
        })
        setState(preState=>({...preState,stat:'loading'}))
        return promise
            .then(data=>{
                if(mountedRef.current)
                setData(data)
                return data
            })
            .catch(error=>{
                setError(error)
                if(config.throwOnError){
                    return Promise.reject(error)
                }
                return error
            })
    },[config.throwOnError,mountedRef,setData,setError])
    return { 
        isIdle: state.stat === 'idle',
        isLoading : state.stat === 'loading',
        isError : state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        setData,
        retry,
        setError,
        ...state
    }
}