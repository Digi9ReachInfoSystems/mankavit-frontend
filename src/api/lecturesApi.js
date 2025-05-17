import api from "../config/axiosConfig";

export const createLecture = async (data) => {
    try {
        const response = await api.post("/lecture/", data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getAllLectures = async () => {
    try {
        const response = await api.get("/lecture/");
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getLectureById = async (id) => {
    try {
        const response = await api.get(`/lecture/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateLectureById = async (id, data) => {
    try {
        const response = await api.put(`/lecture/${id}`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteLectureById = async (id) => {
    try {
        const response = await api.delete(`/lecture/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};