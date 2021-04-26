/*
 * @Descripttion: test
 * @Date: 2021-04-26 22:06:28
 * @LastEditors: love-coding
 * @LastEditTime: 2021-04-26 22:36:15
 */
export const isFalsy = (value) => (value === 0 ? false : !value);
// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (obj) => {
	const result = { ...obj };
    Object.keys(result).forEach(key => {
        const value = result[key];
		//   如果value是0 呢  会出问题 so 写一个函数isFalsy
		if (isFalsy(value)) {
			delete result[key];
		}
    })
	return result;
};
