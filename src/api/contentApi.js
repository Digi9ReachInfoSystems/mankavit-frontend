import api from '../config/axiosConfig'

export const createContent = async (data) => {
    try {
        const response = await api.post('/content/create', data);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

export const getAllContents = async () => {
    try {
        const response = await api.get('/content/getAllContents');
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

export const getContentById = async (id) => {
    try {
        const response = await api.get(`/content/getContentById/${id}`);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

export const updateContentById = async (id, data) => {
    try {
        const response = await api.put(`/content/updateContent/${id}`, data);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;

    }
}

export const deleteContentById = async (id) => {
    try {
        const response = await api.delete(`/content/deleteContentById/${id}`);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }

}