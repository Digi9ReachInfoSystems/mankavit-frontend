import api from "../config/axiosConfig";


export const createWhy = async (data) => {
    try {
        const response = await api.post("/why/create", data);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

export const getAllWhy = async () => {
    try {
        const response = await api.get("/why/getAllWhys");
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

export const updateWhyById = async (id, data) => {
    try {
        const response = await api.put(`/why/updateWhy/${id}`, data);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

export const deleteWhyById = async (id) => {
    try {
        const response = await api.delete(`/why/deleteWhy/${id}`);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

export const getWhyById = async (id) => {
    try {
        const response = await api.get(`/why/getWhyById/${id}`);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}