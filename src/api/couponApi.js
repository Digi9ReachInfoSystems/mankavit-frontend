import api from "../config/axiosConfig";


export const createCoupon = async (data) => {
    try {
        const response = await api.post("/coupon/create", data);
        return response.data;
    } catch (error) {
        console.error("Error creating coupon:", error);
        throw error;
    }
};

export const updateCoupon = async (id, data) => {
    try {
        const response = await api.put(`/coupon/update/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating coupon:", error);
        throw error;
    }
};

export const deleteCoupon = async (id) => {
    try {
        const response = await api.delete(`/coupon/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting coupon:", error);
        throw error;
    }
};

export const getCouponById = async (id) => {
    try {
        const response = await api.get(`/coupon/getById/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error getting coupon by ID:", error);
        throw error;
    }
}

export const getAllCoupon = async () => {
    try {
        const response = await api.get("/coupon/all");
        return response.data;
    } catch (error) {
        console.error("Error getting all coupons:", error);
        throw error;
    }
}

export const getUserCoupon = async (id) => {
    try {
        const response = await api.get(`/coupon/user/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error getting user coupons:", error);
        throw error;
    }
}

export const bulkDeleteCoupon = async (couponIds) => {
    try {
        const response = await api.delete("/coupon/bulk/delete", { data: { ids: couponIds } });
        return response.data;
    } catch (error) {
        console.error("Error bulk deleting coupons:", error);
        throw error;
    }
}

export const validateCoupon = async (data) => {
    try {
        const response = await api.post(`/coupon/validate`,data);
        return response.data;
    } catch (error) {
        console.error("Error validating coupon:", error);
        throw error;
    }
}

export const activateOrDeactivateCoupon = async (id) => {
    try {
        const response = await api.put(`/coupon/activateOrDeactivate/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error activating or deactivating coupon:", error);
        throw error;
    }
}