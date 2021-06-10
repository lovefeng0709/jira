import React from 'react'

export const Mark = ({name,keyWord}:{name:string,keyWord:string})=>{
    if(!keyWord){
        return <>{name}</>
    }
    const arr = name.split(keyWord)
    return <>
        {
            arr.map((str:string,index:number)=><span key={index}>
                {str}
                {
                    index === arr.length - 1? null:<span style={{color:'#257AFD'}}>{keyWord}</span>
                }
            </span>)
        }

    </>

}