import api from "../config/axiosConfig";


export const getCategories = async () => {
    try {
        const response = await api.get('/category/'); 
        return response.data.data; 
       
    } catch (error) {
        // console.error('Error fetching categories:', error);
        throw error;
    }
};

export const createCategory = async (data) => {
    try {
        const response = await api.post('/category/', data);
        return response.data;
    } catch (error) {
        // console.error('Error creating category:', error);
        throw error;
    }
};

export const deleteCategory = async (id) => {
    try {
        const response = await api.delete(`/category/${id}`);
        return response.data;
    } catch (error) {
        // console.error('Error deleting category:', error);
        throw error;
    }
};

export const updateCategory = async (id, data) => {
    try {
        const response = await api.put(`/category/${id}`, data);
        return response.data;
    } catch (error) {
        // console.error('Error updating category:', error);
        throw error;
    }
};

export const getCategoryById = async (id) => {
    try {
        const response = await api.get(`/category/${id}`);
        return response.data;
    } catch (error) {
        // console.error('Error fetching category by ID:', error);
        throw error;
    }
};

export const bulkDeleteCategory = async (categoryIds) => {
    try {
        const response = await api.delete('/category/bulk/delete', { data: { categoryIds } });
        return response.data;
    } catch (error) {
        console.error('Error deleting categories:', error);
        throw error;
    }
};
export const toggleFeaturedCategory = async (id) => {
    try {
        const response = await api.put(`/category/toggle/featured/${id}`);
        return response.data;
    } catch (error) {
        // console.error('Error toggling featured category:', error);
        throw error;
    }
}