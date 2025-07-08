import api from "../config/axiosConfig";

export const createPayment = async (data) => {
    try {
        // userRef, courseRef, amountPaid, paymentType, callback_url
        const response = await api.post("/api/v1/payment/createpayment", data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAllPayments = async () => {
    try {
        const response = await api.get("/api/v1/payment/getAllPayments");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getPaymentByCourseId = async (id) => {
    try {
        const response = await api.get(`/api/v1/payment/getPayamentsByCourseId/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};