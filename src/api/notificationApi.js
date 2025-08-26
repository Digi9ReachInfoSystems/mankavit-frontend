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