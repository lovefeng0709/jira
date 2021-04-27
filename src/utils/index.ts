/*
 * @Descripttion: test
 * @Date: 2021-04-26 22:06:28
 * @LastEditors: love-coding
 * @LastEditTime: 2021-04-27 13:51:04
 */
import  { useState, useEffect } from 'react'

export const isFalsy = (value:any) => (value === 0 ? false : !value);
// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (obj:object) => {
	const result = { ...obj };
	Object.keys(result).forEach((key) => {
		   // @ts-ignore
		const value = result[key];
		//   如果value是0 呢  会出问题 so 写一个函数isFalsy
		if (isFalsy(value)) {
			// @ts-ignore
			delete result[key];
		}
	});
	return result;
};

// export const Debounce = (fn, delay) => {
// 	let timer;
// 	return () => {
// 		if (timer) {
// 			clearTimeout(timer);
// 		}
// 		timer = setTimeout(function() {
// 			fn.apply(this, arguments);
// 		}, delay);
// 	};
// };

export const useDebounce = (value:any, delay?:number)=>{
    const [debounceValue, setDebounceValue] = useState(value);
	// 每次在value变化以后，设置一个定时器
	useEffect(() => {
		const timer = setTimeout(()=>{
			setDebounceValue(value)
		},delay)
		// 上一次effect处理完再运行
		return ()=>clearTimeout(timer)
	}, [value,delay]);
	return debounceValue
}