import api from "../config/axiosConfig";

export const createSupport = async (data) => {
    try{
        const response = await api.post('/contactSupport', data);
        return response.data;
    }catch(error){
        throw error;
    }
};

export const getAllSupport = async () => {
    try{
        const response = await api.get('/contactSupport');
        return response.data;
    }catch(error){
        throw error;
    }
};

export const getSupportById = async (id) => {
    try{
        const response = await api.get(`/contactSupport/${id}`);
        return response.data;
    }catch(error){
        throw error;
    }
};

export const updateSupportById = async (id, data) => {
    try{
        const response = await api.put(`/contactSupport/${id}`, data);
        return response.data;
    }catch(error){
        throw error;
    }
};

export const deleteSupportById = async (id) => {
    try{
        const response = await api.delete(`/contactSupport/${id}`);
        return response.data;
    }catch(error){
        throw error;
    }
};


export const bulkcontactdeletion = async (ids) => {
    try {
        const response = await api.delete('/contactSupport/bulk/delete', {
             data: {ids},
   headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // If using auth
            }


         });
        return response.data;
    } catch (error) {
        throw error;
    }
}