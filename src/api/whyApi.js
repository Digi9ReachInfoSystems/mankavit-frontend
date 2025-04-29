import api from "../config/axiosConfig";


export const creteWhy = async (data) => {
    try {
        const response = await api.post("/why/create", data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getAllWhy = async () => {
    try {
        const response = await api.get("/why/getAllWhys");
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateWhyById = async (id, data) => {
    try {
        const response = await api.put(`/why/updateWhy/${id}`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteWhyById = async (id) => {
    try {
        const response = await api.delete(`/why/deleteWhy/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}