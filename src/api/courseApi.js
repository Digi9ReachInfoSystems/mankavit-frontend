import api from '../config/axiosConfig'

export const createCourse = async (data) => {
    try {
        const response = await api.post("/api/v1/course", data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getAllCourses = async () => {
    try {
        const response = await api.get("/api/v1/course");
        console.log("response", response);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};  



export const getCourseById = async (id) => {
    try {
        console.log(id);
        const response = await api.get(`/api/v1/course/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteCourseById = async (id) => {
    try {
        const response = await api.delete(`/api/v1/course/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateCourseById = async (id, data) => {
    try {
        const response = await api.put(`/api/v1/course/${id}`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


export const getCourseByCategory = async (categoryName) => {
    try {
        const response = await api.get(`/api/v1/course/category/${categoryName}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getNoOfCourses = async () => {
    try {
        const response = await api.get("/api/v1/course/total");
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};