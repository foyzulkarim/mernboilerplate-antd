import axios from "axios";

const BaseUrl = "http://localhost:5000/api";

export const getUsers = async () => {
    const response = await axios.get(BaseUrl + "/users");
    return response.data;
};

export const getCustomers = async () => {
    const response = await axios.get(BaseUrl + "/customers");
    return response.data;
};

export const addRole = async (payload) => {
    const response = await axios.post(`${BaseUrl}/roles`, payload);
    return response.data;
};

export const getRoles = async () => {
    const response = await axios.get(BaseUrl + "/roles");
    return response.data;
};
export const searchRoles = async (fromDate, toDate, searchText) => {
    let payload = {};
    if (fromDate && toDate) {
        payload = { fromDate, toDate };
    }
    if (searchText) {
        payload = { searchText, ...payload };
    }

    const response = await axios.post(`${BaseUrl}/roles/search`, payload);
    return response.data;
};

export const addProduct = async (payload) => {
    const response = await axios.post(`${BaseUrl}/products`, payload);
    return response.data;
};

export const getProducts = async () => {
    const response = await axios.get(BaseUrl + "/products");
    return response.data;
};

export const searchProducts = async (fromDate, toDate, searchText) => {
    let payload = {};
    if (fromDate && toDate) {
        payload = { fromDate, toDate };
    }
    if (searchText) {
        payload = { searchText, ...payload };
    }

    const response = await axios.post(`${BaseUrl}/products/search`, payload);
    return response.data;
};

export const getResources = async () => {
    const response = await axios.get(BaseUrl + "/resources");
    return response.data;
};

export const getPermissions = async () => {
    const response = await axios.get(BaseUrl + "/permissions");
    return response.data;
};


export const addFilter = async (payload) => {
    const response = await axios.post(`${BaseUrl}/filters`, payload);
    return response.data;
};

export const updateFilter = async (payload) => {
    const response = await axios.put(`${BaseUrl}/filters/${payload.id}`, payload);
    return response.data;
};

export const searchFilters = async (payload) => {
    const response = await axios.post(`${BaseUrl}/filters/search`, payload);
    return response.data;
};

export const deleteFilter = async (id) => {
    const response = await axios.delete(`${BaseUrl}/filters/${id}`);
    return response.data;
};
