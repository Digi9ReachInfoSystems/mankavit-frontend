import api from "../config/axiosConfig";



export const generateSignature = async (data) => {
    try {
        const response = await api.post('/meeting/generateSignature', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAllMeetings = async (courseId,from,to) => {
    try {
        let queryParams = '';
        const params = [];
        
        if (courseId) params.push(`courseId=${courseId}`);
        if (from) params.push(`from=${from}`);
        if (to) params.push(`to=${to}`);
        
        if (params.length > 0) {
            queryParams = `?${params.join('&')}`;
        }
        const response = await api.get(`/meeting/getAllMeetings${queryParams}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export  const createMeeting = async (data) => {
    try {
        const response = await api.post('/api/v1/zoom/create', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getUpComingMeetings = async (userId) => {
    try {
        const response = await api.get(`/meeting/upcomingmeetings/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const getLiveMeetings = async (data) => {
    try {
        const response = await api.post(`/meeting/getlivemeetings`,data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const generateMeetingSignature = async (data) => {
    try {
        const response = await api.post('/meeting/generateSignature', data);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const generateAccessToken = async (data) => {
    try {
        const response = await api.get('/meeting/getAccessToken');
        return response.data;
    } catch (error) {
        throw error;
    }
}