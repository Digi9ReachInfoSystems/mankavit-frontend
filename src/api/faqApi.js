import api from "../config/axiosConfig";

export const createFaq = async (data) => {
    try {
        const response = await api.post("/faq/create", data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


export const getAllfaqs = async () => {
    try {
     
        const response = await api.get('/faq/getAllFaqs');
        console.log("response",response.data);
        return response.data;
        
    } catch (error) {
        console.log(error, "error",error.message);
        // throw error;
    }
};



export const getFaqById = async (id) => {
    try {
        const response = await api.get(`/faq/getFaqById/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateFaqById = async (id, data) => {
    try {
        const response = await api.put(`/faq/updateFaqById/${id}`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};  

export const deleteFaqById = async (id) => {
    try {
        const response = await api.delete(`/faq/deletFaqById/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};  