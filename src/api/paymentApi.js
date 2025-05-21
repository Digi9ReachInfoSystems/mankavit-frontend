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