import api from '../config/axiosConfig';

export const createOrUpdateCourseDynamicContent = async (data) => {
    try {
        const response = await api.put('/coursePageDynamic/updateContentorcreate', data);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

export const getCourseDynamicContent = async () => {
    try {
        const response = await api.get('/coursePageDynamic/getContent');
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}