import api from "../config/axiosConfig";

export const createNotes = async (data) => {
    try {
        const response = await api.post("/notes/notes", data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getAllNotes = async () => {
    try {
        const response = await api.get("/notes/notes");
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getNotesById = async (id) => {
    try {
        const response = await api.get(`/notes/notes/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updatenotesById = async (id, data) => {
    try {
        const response = await api.put(`/notes/notes/${id}`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteNotesById = async (id) => {
    try {
        const response = await api.delete(`/notes/notes/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getNoOfNotes = async () => {
    try {
        const response = await api.get('/notes/total');
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}