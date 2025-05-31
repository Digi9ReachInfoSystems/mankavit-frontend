import api from "../config/axiosConfig";


export const createKycApi = async (kycData) => {
    try {
        const response = await api.post('/kyc', kycData);
        return response.data;
    } catch (error) {
        console.error('Error creating KYC:', error);
        throw error;
    }
}