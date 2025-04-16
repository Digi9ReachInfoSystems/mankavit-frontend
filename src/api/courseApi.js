import api from '../config/axiosConfig'

export const createCourse = async (data) => {
    try {
        const response = await api.post("/course/courses", data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getAllCourses = async () => {
    try {
        const response = await api.get("/course/courses");
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};  


export const getCourseById = async (id) => {
    try {
        const response = await api.get(`/course/courses/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteCourseById = async (id) => {
    try {
        const response = await api.delete(`/course/courses/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateCourseById = async (id, data) => {
    try {
        const response = await api.put(`/course/courses/${id}`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


