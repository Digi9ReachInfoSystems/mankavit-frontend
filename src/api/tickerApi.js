import api from "../config/axiosConfig";

export const cerateTicker = async (data) => {
    try {
        const response = await api.post('/ticker/create', data);
        return response.data;
    } catch (error) {
        console.error('Error creating ticker:', error);
        throw error;
    }
};

export const getAllTickers = async () => {
    try {
        const response = await api.get('/ticker/getAllTickers');
        return response.data;
    } catch (error) {
        console.error('Error fetching tickers:', error);
        throw error;
    }
};

export const getTickerById = async (id) => {
    try {
        const response = await api.get(`/ticker/getTickerById/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching ticker by ID:', error);
        throw error;
    }
};

export const updateTicker = async (id, data) => {
    try {   
        const response = await api.put(`/ticker/updateTickerById/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating ticker:', error);
        throw error;
    }
    };

    export const deleteTickerById = async (id) => {
        try {
            const response = await api.delete(`/ticker/deleteTickerById/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting ticker by ID:', error);
            throw error;
        }
    };  