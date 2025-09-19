import api from "../config/axiosConfig";

export const getAllEnrolledCourses=async(userId)=>{
    try {
        const response = await api.get(`/user/get/allEnrolledCourses/${userId}`);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

export const getAllCompletedCourses=async(userId)=>{
    try {
        const response = await api.get(`/user/get/completedEnrolledCourses/${userId}`);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

export const getAllOngoingCourses=async(userId)=>{
    try {
        const response = await api.get(`/user/get/ongoingEnrolledCourses/${userId}`);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}
