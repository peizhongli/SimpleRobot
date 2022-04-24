import axios from 'axios';
const baseURL = '/tuling';
const service = axios.create({
    baseURL,
    timeout: 50000, // request timeout
});
// 请求拦截
service.interceptors.request.use(
    config => {
        // 如果有token 就携带tokon
        const token = window.localStorage.getItem('accessToken');
        if (token) {
            config.headers.common.Authorization = token;
        }
        return config;
    },
    error => Promise.reject(error)
);
// 响应拦截
service.interceptors.response.use(
    response => {
        const res = response.data;
        if (response.status !== 200) {
            return Promise.reject(new Error(res.message || 'Error'));
        }
        return res;
    },
    error => {
        return Promise.reject(error);
    }
);
export default service;
