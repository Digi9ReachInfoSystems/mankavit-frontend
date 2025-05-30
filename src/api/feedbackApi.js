import api from "../config/axiosConfig";

export const  createFeedApi = async (feedbackData) => {
    try {
        const response = await api.post('/feedback', feedbackData);
        return response.data;
    } catch (error) {
        console.error('Error creating feedback:', error);
        throw error;
    }
}

