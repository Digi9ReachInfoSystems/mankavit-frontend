import api from "../config/axiosConfig"

export const createExam = async (data) => {
    try {
        const response = await api.post('/exam/create', data);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

export const getAllExams = async () => {
    try {
        const response = await api.get('/exam/getAllPrevious');
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

export const getExamById = async (id) => {
    try {
        const response = await api.get(`/exam/getPreviousById/${id}`);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

export const updateExamById = async (id, data) => {
    try {
        const response = await api.put(`/exam/updatePrevious/${id}`, data);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

export const deleteExamById = async (id) => {
    try {
        const response = await api.delete(`/exam/deletePrevious/${id}`);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}   