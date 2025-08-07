import api from "../config/axiosConfig";

export const createLecture = async (data) => {
    try {
        console.log("Resposne data", data);
        const response = await api.post("/lecture", data);
        console.log("Darta", response.data);
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

export const bulkDeleteLectures = async (lectureIds) => {
    try {



        const response = await api.delete('/lecture/bulk/delete', {
            data: { lectureIds },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // If using auth
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error bulk deleting subjects:', {
            message: error.message,
            response: error.response?.data,
            stack: error.stack
        });
        throw error;
    }
}


export const rearrangeLectures = async (data) => {
    try {
        const response = await api.put('/lecture/lectures/rearrangeLectures', data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};