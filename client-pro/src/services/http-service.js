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

    console.log('url', API_URL, url);
    options.headers['rbac-client-time'] = `${new Date()} `;

    return {
        url: `${API_URL}${url}`,
        options: { ...options, interceptors: true },
    };
});

request.interceptors.response.use(async (response, options) => {
    // if resposne is 401, return initialize with null 
    if (response.status === 401) {
        localStorage.removeItem('auth');
        history.replace({
            pathname: '/user/login',
        });
        return { name: response.name };
    }
    // handle 403
    if (response.status === 403) {
        history.replace({
            pathname: '/exception/403',
        });
        return { name: response.name };
    }

    // handle 404
    if (response.status === 404) {
        history.replace({
            pathname: '/exception/404',
        });
        return { name: response.name };
    }

    if (response.status === 400) {
        const data = await response.clone().json();
        console.log('data', data);
        const errorObj = new Error(data.message);
        errorObj.error = data.error;
        return errorObj;
        // throw errorObj;
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