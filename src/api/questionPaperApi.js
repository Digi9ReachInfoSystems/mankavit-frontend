import api from '../config/axiosConfig'

export const cerateQuestionPaper = async (data) => {
    try {
        const response = await api.post(`/question/cerate`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const getAllQuestionPapers = async () => {
    try {
        const response = await api.get(`/question/getAllQuestionpapers`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const getQuestionPaperById = async (id) => {
    try {
        const response = await api.get(`/question/getQuestionPaperById/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateQuestionPaperById = async (id, data) => {
    try {
        const response = await api.put(`/question/updateQuestionPaper/${id}`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteQuestionPaperById = async (id) => {
    try {
        const response = await api.delete(`/question/deleteQuestionPaper/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
