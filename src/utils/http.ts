/*
 * @Descripttion: test
 * @Date: 2021-04-28 16:34:53
 * @LastEditors: love-coding
 * @LastEditTime: 2021-04-28 17:57:24
 */
import * as auth from 'auth-provider';
import { useAuth } from 'context/auth-context';
import qs from 'qs';

const apiUrl = process.env.REACT_APP_API_URL;
interface Config extends RequestInit {
	token?: string;
	data?: object;
}
export const http = async (endpoint: string, { data, token, headers, ...customConfig }: Config={}) => {
	const config = {
		method: 'GET',
		headers: {
			Authorization: token ? `Bearer ${token}` : '',
			'Content-Type': data ? 'application/json' : ''
		},
		...customConfig
	};
	if (config.method.toUpperCase() === 'GET') {
		endpoint += `?${qs.stringify(data)}`;
	} else {
		config.body = JSON.stringify(data || {});
	}
    // fetch 当接收到一个代表错误的 HTTP 状态码时，从 fetch() 返回的 Promise 不会被标记为 reject，
    // 即使响应的 HTTP 状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve 
    //（但是会将 resolve 的返回值的 ok 属性设置为 false ），仅当网络故障时或请求被阻止时，才会标记为 reject
	return window.fetch(`${apiUrl}/${endpoint}`, config).then(async (response) => {
		if (response.status === 401) {
			await auth.logout();
            window.location.reload();
            return Promise.reject({message:'请重新登录'})
		}
        const data =await response.json();
        if(response.ok){
            return data
        }else{
            return Promise.reject(data)
        }
	});
};

export const useHttp = ()=>{
    const {user} = useAuth()
    return (...[endpoint,config]:Parameters<typeof http>)=> http(endpoint, { ...config, token: user?.token })
}