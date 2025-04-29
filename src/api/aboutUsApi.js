import api from "../config/axiosConfig";

export const createAboutUs = async (data) => {
    try {
        const response = await api.post("/aboutus/create", data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getAllAboutUs = async () => {
    try {
        const response = await api.get("/aboutus/getAllAboutUs");
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteAboutUsById = async (id) => {
    try {
        const response = await api.delete(`/aboutus/deleteAboutUs/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


export const updateAboutUsById = async (id, data) => {
    try {
        const response = await api.put(`/aboutus/updateAboutUs/${id}`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};  