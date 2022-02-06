import request from 'umi-request';

export const get = async (url, params, options) => request(url, {
    method: 'GET',
    params: params,
    skipErrorHandler: true,
    ...(options || {})
});

export const post = async (url, data, options) => request(url, {
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