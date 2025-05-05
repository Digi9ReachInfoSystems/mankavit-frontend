import api from "../config/axiosConfig";


export const getCategories = async () => {
    try {
        const response = await api.get('/category/'); 
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};