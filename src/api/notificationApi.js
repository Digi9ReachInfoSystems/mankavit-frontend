import api from "../config/axiosConfig";

export const createNotification = async (data) => {
    try {
        const response = await api.post("/notifications/create", data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserNotifications = async (userId) => {
    try {
        const response = await api.get(`/notifications/getUserNotifications/${userId}`,);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getNotificationByNotificationId = async (notificationId) => {
    try {
        const response = await api.get(`/notifications/getNotificationById/${notificationId}`,);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const clearNotification = async (notificationId) => {
    try {
        const response = await api.delete(`/notifications/userNotifications/${notificationId}`,);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const markNotificationasread = async (userId) => {
    try {
        const response = await api.put(`/notifications/markAsRead/${userId}`,);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getAllNotifications = async () => {
    try {
        const response = await api.get(`/notifications/getAllNotifications`,);
        return response.data;
    } catch (error) {
        throw error;
    }
}


// api/notificationApi.js
export const bulknotificationdeletion = async (notificationIds) => {
  const response = await api.delete(
    '/notifications/bulk/deleteNotifications',
    {
      data: { notificationIds },          // <-- rename key
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      timeout: 300000,
    }
  );
  return response.data;
};
