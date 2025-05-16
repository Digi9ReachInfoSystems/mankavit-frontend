import api from "../config/axiosConfig"

export const createTestimonials = async (data) => {
    try {
        console.log("Data",data);
        const response = await api.post('/testimonials/create', data);
       console.log("Response",response.data);
        return response.data;a
    } catch (error) {
        console.error('Error creating testimonials:', error);
        throw error;
    }
};

export const getAlltestimonials = async () => {
    try {
        const response = await api.get('/testimonials/getAllTestimonials');
        return response.data;
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        throw error;
    }
};

export const getTestimonialById = async (id) => {
    try {
        const response = await api.get(`/testimonials/getTestimonialsById/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching testimonial by id:', error);
        throw error;
    }
}

export const updateTestimonialById = async (id, data) => {
    try {
        const response = await api.put(`/testimonials/updateTestimonialsById/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating testimonial by id:', error);
        throw error;
    }
}
export const deleteTestimonalById = async (id) => {
    try {
        const response = await api.delete(`/testimonials/deleteTestimonialsById/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting testimonial by id:', error);
        throw error;
    }
}