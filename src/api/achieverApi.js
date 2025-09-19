import api from '../config/axiosConfig'

export const createAchiever = async (data) => {
    try {
        const response = await api.post('/achiever/create', data);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

export const getAllAchievers = async () => {
    try {
        const response = await api.get('/achiever/getAllAchievers');
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

export const getAchieverById  = async (id) => {
    try {
        const response = await api.get(`/achiever/getAchieverById/${id}`);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

export const updateAchieverById = async (id, data) => {
    try {
        const response = await api.put(`/achiever/updateAchiever/${id}`, data);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

export const deleteAchieverById = async (id) => {
    try {
        const response = await api.delete(`/achiever/deleteAchiever/${id}`);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}