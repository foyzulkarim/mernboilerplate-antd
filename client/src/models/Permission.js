import httpsService from "../services/httpService";

class Permission {
    /**
     * Get all roles
     * 
     * @returns 
     */
    static async all() {
        const response = await httpsService.get(`permissions`);
        return response.data;
    }

    /**
     * Create new role
     * 
     * @param {*} payload 
     * @returns 
     */
    static async create(payload) {
        const response = await httpsService.post(`permissions`, payload);
        return response.data;
    }
}

export default Permission;
