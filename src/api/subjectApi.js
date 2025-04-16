import api from "../config/axiosConfig";

export const getSubjects = async () => {
    try {
        const response = await api.get('/subject/subjects'); 
        return response.data;
    } catch (error) {
        console.error('Error fetching subjects:', error);
        throw error;
    }
};

export const createSubject = async (data) => {
    try {
        const response = await api.post('/subject/subjects', data);
        return response.data;
    } catch (error) {
        console.error('Error creating subject:', error);
        throw error;
    }
};

export const getSubjectById = async (id) => {
    try {
        const response = await api.get(`/subject/subjects/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching subject by ID:', error);
        throw error;
    }
};

export const updateSubjectById = async (id, data) => {
    try {
        const response = await api.put(`/subject/subjects/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating subject by ID:', error);
        throw error;
    }
};

export const deleteSubjectByid = async (id) => {
    try {
        const response = await api.delete(`/subject/subjects/${id}`);
        return response.data;
    } catch (error) {   
        console.error('Error deleting subject by ID:', error);
        throw error;
    }
};