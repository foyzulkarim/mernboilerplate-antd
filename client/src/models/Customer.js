import httpsService from "../services/httpService";

class Customer {
    /**
     * Get all roles
     * 
     * @returns 
     */
    static async all() {
        const response = await httpsService.get(`customers`);
        return response.data;
    }

    /**
     * Create new role
     * 
     * @param {*} payload 
     * @returns 
     */
    static async create(payload) {
        const response = await httpsService.post(`customers`, payload);
        return response.data;
    }
}

export default Customer;
