import api from "../config/axiosConfig";


export const createKycApi = async (kycData) => {
    try {
        const response = await api.post('/kyc', kycData);
        return response.data;
    } catch (error) {
        // console.error('Error creating KYC:', error);
        throw error;
    }
}

// Update your kycApi.js
export const approveKYC = async (id, status = "approved") => {
  try {
    // console.log("Approving KYC for:", id);
    const response = await api.patch(`/kyc/${id}/status`, { 

      status // Add explicit action type
    });
    return response.data;
  } catch (error) {
    // console.error('Error approving KYC:', {
    //   error: error.message,
    //   response: error.response?.data,
    //   status: error.response?.status
    // });
    throw error;
  }
}

export const getKYCById = async (id) => {
  try {
    const response = await api.get(`/kyc/${id}`);
    return response.data;
  } catch (error) {
    // console.error('Error getting KYC by ID:', error);
    throw error;
  }
}

export const getKYCbyUserId = async (userId) => {
  try {
    const response = await api.get(`/kyc/user/${userId}`);
    return response.data;
  } catch (error) {
    // console.error('Error getting KYC by user ID:', error);
    throw error;
  }
}


export const updateKycById = async (id, kycData) => {
  try {
    const response = await api.put(`/kyc/${id}`, kycData);
    return response.data;
  } catch (error) {
    // console.error('Error updating KYC by ID:', error);
    throw error;
  }
}