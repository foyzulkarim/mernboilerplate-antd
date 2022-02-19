import request from 'umi-request';
import { history } from 'umi';
request.interceptors.request.use((url, options) => {
    let authStr = localStorage.getItem('auth');
    if (authStr && JSON.parse(authStr)) {
        const auth = JSON.parse(authStr);
        const token = auth.token;
        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        } else {
            options.headers['Authorization'] = null;
        }
    }

    console.log('url', url);
    options.headers['rbac-client-time'] = `${new Date()} `;

    return {
        url: `${API_URL}${url}`,
        options: { ...options, interceptors: true },
    };
});

request.interceptors.response.use(async (response, options) => {
    // if resposne is 401, return initialize with null 
    if (response.status === 401) {
        const data = await response.clone().json();
        localStorage.removeItem('auth');
        history.replace({
            pathname: '/user/login',
        });
        message.error(data.errorMessage);
        return { name: response.name };
    }
    return response;
});

export const get = async (url, params, options) => request(url, {
    method: 'GET',
    params: params,
    skipErrorHandler: true,
    ...(options || {})
});

export const post = async (url, data, options) => await request(url, {
    method: 'POST',
    data: data,
    skipErrorHandler: true,
    ...(options || {})
});

export const put = async (url, data, options) => request(url, {
    method: 'PUT',
    data: data,
    skipErrorHandler: true,
    ...(options || {})
});

export const del = async (url, data, options) => request(url, {
    method: 'DELETE',
    data: data,
    skipErrorHandler: true,
    ...(options || {})
});