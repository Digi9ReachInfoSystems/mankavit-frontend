import api from "../config/axiosConfig";    


export const getCertificate = async (userId, courseId) => {
    try {
        const response = await api.get(`/certificates?user_id=${userId}&course_id=${courseId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching certificate:', error);
        throw error;
    }
}

export const getAllCertificates = async (userId) => {
    try {
        const response = await api.get(`/certificates/user/${userId}`);
        console.log("All certificates response", response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching all certificates:', error);
        throw error;
    }
}