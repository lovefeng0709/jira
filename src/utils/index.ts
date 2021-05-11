/*
 * @Descripttion: test
 * @Date: 2021-04-26 22:06:28
 * @LastEditors: love-coding
 * @LastEditTime: 2021-05-11 13:01:18
 */
import { useState, useEffect, useRef } from 'react';
// unknown 不能赋值给任何类型 也不能在它上读取方法
export const isFalsy = (value: unknown): boolean => (value === 0 ? false : !value);
export const isVoid = (value: unknown): boolean => value === undefined||value === null||value===''
// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (obj: {[key: string]:unknown}) => {
	const result = { ...obj };
	Object.keys(result).forEach((key) => {
		
		const value = result[key];
		//   如果value是0 呢  会出问题 so 写一个函数isFalsy
		if (isVoid(value)) {
	
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
// 用泛型来规范类型
export const useDebounce = <V>(value: V, delay?: number) => {
	const [ debounceValue, setDebounceValue ] = useState(value);
	// 每次在value变化以后，设置一个定时器
	useEffect(
		() => {
			const timer = setTimeout(() => {
				setDebounceValue(value);
			}, delay);
			// 上一次effect处理完再运行
			return () => clearTimeout(timer);
		},
		[ value, delay ]
	);
	return debounceValue;
};

export const useArray = <T>(initialValue: T[]) => {
	const [ value, setValue ] = useState(initialValue);
	return {
		value,
		setValue,
		clear: () => setValue([]),
		removeIndex: (index: number) => {
			const arr = [ ...value ];
			arr.splice(index, 1);
			setValue(arr);
		},
		add: (item: T) => setValue([ ...value, item ])
	};
};
export const useDocumentTitle = (title: string,keepOnUnmount=true) =>{
	const oldTitle = useRef(document.title).current;
	useEffect(() => {
		document.title = title;
	}, [title]);
	useEffect(() => {
		return ()=>{
			if(!keepOnUnmount){
				document.title = oldTitle
			}
		}
	}, [keepOnUnmount,oldTitle]);
}