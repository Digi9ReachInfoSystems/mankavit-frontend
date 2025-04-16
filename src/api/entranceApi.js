import api from '../config/axiosConfig';

export const createEntrnace = async (data) => {
    try {
        const response = await api.post('/entrance/create', data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getAllEntrances = async () => {
    try {
        const response = await api.get('/entrance/getAllEntrances');
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const getEntranceById = async (id) => {
    try {
        const response = await api.get(`/entrance/getEntranceById/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateEntrance = async (id, data) => {
    try {
        const response = await api.put(`/entrance/updateEntrance/${id}`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const deleteEntranceById = async (id) => {
    try {
        const response = await api.delete(`/entrance/deleteEntrance/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }

}