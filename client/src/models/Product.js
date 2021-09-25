import httpsService from "../services/httpService";

class Product {
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
    
        const response = await httpsService.post(`products/search`, payload);
        return response.data;
    };

    /**
     * Get all roles
     * 
     * @returns 
     */
    static async all() {
        const response = await httpsService.get(`products`);
        return response.data;
    }

    /**
     * Create new role
     * 
     * @param {*} payload 
     * @returns 
     */
    static async create(payload) {
        const response = await httpsService.post(`products`, payload);
        return response.data;
    }
}

export default Product;
