import httpsService from "../services/httpService";

class Role {
    /**
     * Search Roles
     * 
     * @param {*} fromDate 
     * @param {*} toDate 
     * @param {*} searchText 
     * @returns 
     */
    static async search(fromDate, toDate, searchText) {
        let payload = {};
        if (fromDate && toDate) {
            payload = { fromDate, toDate };
        }
        if (searchText) {
            payload = { searchText, ...payload };
        }
    
        const response = await httpsService.post(`roles/search`, payload);
        return response.data;
    };

    /**
     * Get all roles
     * 
     * @returns 
     */
    static async all() {
        const response = await httpsService.get(`roles`);
        return response.data;
    }

    /**
     * Create new role
     * 
     * @param {*} payload 
     * @returns 
     */
    static async create(payload) {
        const response = await httpsService.post(`roles`, payload);
        return response.data;
    }
}

export default Role;
