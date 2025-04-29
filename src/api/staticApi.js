import api from "../config/axiosConfig";
export const createStatic = async (data) => {
    try {
        console.log(data);
        const response = await api.post("/static/create", data);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updatestaticById = async (id, data) => {
    try {
        const response = await api.put(`/static/updateStatic/${id}`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getAllStatic = async () => {
    try {
        const response = await api.get("/static/getAllStatics");
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};