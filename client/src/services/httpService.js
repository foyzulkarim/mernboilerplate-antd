import axios from "axios";

const BaseUrl = process.env.REACT_APP_API_URL !== null ? process.env.REACT_APP_API_URL : "http://localhost:5000/api";

// private methods
function getUrl(url) {
	if (url.startsWith('https://') || url.startsWith('http://')) {
		return url;
	}
	return `${BaseUrl}/${url}`;
}

class HttpService {
    /**
	 * Get API endpoints
     * 
	 * @param {*} url
	 * @param {*} headers
	 * @returns
	 */
	async get(url, headers = {}) {
        return await axios.get(getUrl(url));
	};

    /**
     * Post API endpoint
     * 
     * @param {*} url 
     * @param {*} data 
     * @param {*} headers 
     * @returns 
     */
    async post(url, data, headers = {}) {
        return await axios.post(getUrl(url), data);
    }

    /**
     * Delete API endpoint
     * 
     * @param {*} url 
     * @returns 
     */
     async put(url, data) {
        return await axios.put(getUrl(url), data);
    }

    /**
     * Delete API endpoint
     * 
     * @param {*} url 
     * @returns 
     */
    async delete(url) {
        return await axios.delete(getUrl(url));
    }
}

export default new HttpService;
