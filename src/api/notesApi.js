import api from "../config/axiosConfig";

export const createNotes = async (data) => {
    try {
        const response = await api.post("/note/notes", data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getAllNotes = async () => {
    try {
        const response = await api.get("/note/notes");
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getNotesById = async (id) => {
    try {
        const response = await api.get(`/note/notes/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updatenotesById = async (id, data) => {
    try {
        const response = await api.put(`/note/notes/${id}`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteNotesById = async (id) => {
    try {
        const response = await api.delete(`/note/notes/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}