import api from "../config/axiosConfig";



export const generateSignature = async (data) => {
    try {
        const response = await api.post('/meeting/generateSignature', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};