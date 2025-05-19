import api from "../config/axiosConfig";    


export const getMissions = async () => {
    try {
        const response = await api.get('/mission/getAllMissions'); 
        return response.data;
    } catch (error) {
        console.error('Error fetching missions:', error);
        throw error;
    }
};

export const createMission = async (data) => {
    try {
        const response = await api.post('/mission/create', data);
        return response.data;
    } catch (error) {
        console.error('Error creating mission:', error);
        throw error;
    }
};

export const getMissionById = async (id) => {
    try {
        const response = await api.get(`/mission/getMissionById/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching mission by ID:', error);
        throw error;
    }
};

export const updateMissionById = async (id, data) => {
    try {
        const response = await api.put(`/mission/updateMission/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating mission by ID:', error);
        throw error;
    }
};

export const deleteMissionById = async (id) => {
    try {
        const response = await api.delete(`/mission/deleteMission/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting mission by ID:', error);
        throw error;
    }
};