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

export const getUserFeedback = async () => {
  try {
    // send ?userId=abc so your controller builds { userRef: abc } filter
    const res = await api.get("/feedback");
    // res.data === { success, count, data: [ … ] }
    return res.data.data;
  } catch (err) {
    console.error("Error fetching user feedback:", err);
    throw err;
  }
};

export const approveFeedback  = async (id) => {
  try {
    const response = await api.patch(`/feedback/${id}/approve`);
    return response.data;
  } catch (error) {
    console.error('Error approving feedback:', error);
    throw error;
  }
}

// src/api/feedbackApi.js
// src/api/feedbackApi.js
// src/api/feedbackApi.js
export const bulkFeedbackDeletion = async (ids) => {
  try {
    console.log("Deleting feedback IDs:", ids);
    
    const response = await api.delete('/feedback/bulk/delete', {
      data: { feedbackIds: ids }, // ✅ Match backend field name
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error deleting feedback:', error);
    throw error;
  }
};