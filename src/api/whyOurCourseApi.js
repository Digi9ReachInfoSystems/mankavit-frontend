import api from "../config/axiosConfig";



export const createWhyOurCourse = async (data) => {
    try{
        const response = await api.post('/whyOurCourse/create', data);
        return response.data;
    }catch(error){
        throw error;
    }
}

export const getAllWhyOurCourse = async () => {
    try{
        const response = await api.get('/whyOurCourse/getAllWhyOurCourse');
        return response.data;
    }catch(error){
        throw error;
    }
}

export const getWhyOurCourseById = async (id) => {
    try{
        const response = await api.get(`/whyOurCourse/getWhyOurCourseById/${id}`);
        return response.data;
    }catch(error){
        throw error;
    }
}

export const updateWhyOurCourseById = async (id, data) => {
    try{
        const response = await api.put(`/whyOurCourse/updateWhyOurCourse/${id}`, data);
        return response.data;
    }catch(error){
        throw error;
    }
}

export const deleteWhyOurCourseById = async (id) => {
    try{
        const response = await api.delete(`/whyOurCourse/deleteWhyOurCourse/${id}`);
        return response.data;
    }catch(error){
        throw error;
    }
}