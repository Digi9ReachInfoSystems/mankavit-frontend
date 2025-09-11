import api from "../config/axiosConfig";



export const generateSignature = async (data) => {
    try {
        const response = await api.post('/meeting/generateSignature', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAllMeetings = async (courseId,from,to,hostEmail,isSuperAdmin) => {
    try {
        let queryParams = '';
        const params = [];
        
        if (courseId) params.push(`courseId=${courseId}`);
        if (from) params.push(`from=${from}`);
        if (to) params.push(`to=${to}`);
        if (hostEmail) params.push(`hostEmail=${hostEmail}`);
        if (isSuperAdmin) params.push(`isSuperAdmin=${isSuperAdmin}`);
        
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
        const response = await api.post('/meeting/create/Meeting', data);
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

export const bulkDeleteMeetings = async (meetingIds) => {
  try {
    const response = await api.delete("/meeting/bulk/delete/meetings", {
      data: { ids: meetingIds },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // If using auth
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateMeetingStatus = async (meetingId) => {
  try {
    const response = await api.patch(`/meeting/update/isEnded/${meetingId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};