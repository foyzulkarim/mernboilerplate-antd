import httpsService from "../services/httpService";

class Filter {
    /**
     * Search Filter
     * 
     * @param {*} fromDate 
     * @param {*} toDate 
     * @param {*} searchText 
     * @returns 
     */
    static async search(payload) {
        const response = await httpsService.post(`filters/search`, payload);
        return response.data;
    };

    /**
     * Get all roles
     * 
     * @returns 
     */
    static async all() {
        const response = await httpsService.get(`filters`);
        return response.data;
    }

    /**
     * Create new role
     * 
     * @param {*} payload 
     * @returns 
     */
    static async create(payload) {
        const response = await httpsService.post(`filters`, payload);
        return response.data;
    }

    static async update(payload) {
        const response = await httpsService.put(`filters/${payload.id}`, payload);
        return response.data;
    }

    static async delete(id) {
        const response = await httpsService.delete(`filters/${id}`);
        return response.data;
    }
}

export default Filter;
