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