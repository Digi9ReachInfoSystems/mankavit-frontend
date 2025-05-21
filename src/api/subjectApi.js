import api from "../config/axiosConfig";

export const getSubjects = async () => {
    try {
        const response = await api.get('/api/v1/subject/'); 
        return response.data;
    } catch (error) {
        console.error('Error fetching subjects:', error);
        throw error;
    }
};

export const createSubject = async (data) => {
    try {
        const response = await api.post('/api/v1/subject', data);
        return response.data;
    } catch (error) {
        console.error('Error creating subject:', error);
        throw error;
    }
};

export const getSubjectById = async (id) => {
    try {
        const response = await api.get(`/api/v1/subject/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching subject by ID:', error);
        throw error;
    }
};

export const updateSubjectById = async (id, data) => {
    try {
        const response = await api.put(`/api/v1/subject/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating subject by ID:', error);
        throw error;
    }
};

export const deleteSubjectByid = async (id) => {
    try {
        const response = await api.delete(`/api/v1/subject/${id}`);
        return response.data;
    } catch (error) {   
        console.error('Error deleting subject by ID:', error);
        throw error;
    }
};

export const getNoOfSubjects = async () => {
    try {
        const response = await api.get('/api/v1/subject/total');
        return response.data;
    } catch (error) {
        console.error('Error fetching number of subjects:', error);
        throw error;
    }
};