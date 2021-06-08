/*
 * @Descripttion: test
 * @Date: 2021-04-26 22:06:28
 * @LastEditors: love-coding
 * @LastEditTime: 2021-06-08 10:47:45
 */
import { useState, useEffect, useRef } from 'react';
// unknown 不能赋值给任何类型 也不能在它上读取方法
export const isFalsy = (value: unknown): boolean => (value === 0 ? false : !value);
export const isVoid = (value: unknown): boolean => value === undefined || value === null || value === '';
// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (obj: { [key: string]: unknown }) => {
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
export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
	const oldTitle = useRef(document.title).current;
	useEffect(
		() => {
			document.title = title;
		},
		[ title ]
	);
	useEffect(
		() => {
			return () => {
				if (!keepOnUnmount) {
					document.title = oldTitle;
				}
			};
		},
		[ keepOnUnmount, oldTitle ]
	);
};

export const resetRoute = () => (window.location.href = window.location.origin);
/**
 * 返回组件的加载状态，如果还没挂载或者已经卸载，返回false, 反之 返回true
 */
export const useMountedRef = () => {
	const mountedRef = useRef(false);
	useEffect(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
		};
	});
	return mountedRef;
};
/**
 * 传入一个对象，和键集合，返回对应的对象中的键值对
 * @param obj
 * @param keys
 */
export const subset = <O extends { [key in string]: unknown }, K extends keyof O>(obj: O, keys: K[]) => {
	const filteredEntries = Object.entries(obj).filter(([ key ]) => keys.includes(key as K));
	return Object.fromEntries(filteredEntries) as Pick<O, K>;
};
