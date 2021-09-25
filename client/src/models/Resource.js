import httpsService from "../services/httpService";

class Resource {
    /**
     * Get all roles
     * 
     * @returns 
     */
    static async all() {
        const response = await httpsService.get(`resources`);
        return response.data;
    }

    /**
     * Create new role
     * 
     * @param {*} payload 
     * @returns 
     */
    static async create(payload) {
        const response = await httpsService.post(`resources`, payload);
        return response.data;
    }
}

export default Resource;
