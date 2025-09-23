import api from "../config/axiosConfig";
import { clearCookies, getCookiesData } from "../utils/cookiesService";


export const registerUser = async (data) => {
    try {
        const response = await api.post("/user/register", data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const loginUser = async (data) => {
    try {
        const response = await api.post("/user/login", data);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
};

export const updateAccessToken = async () => {
    // console.log("updatedAccessToken");

    try {
        const coookies = getCookiesData();
        if (!coookies) {
            window.location.href = '/login';
            // console.log("No cookies found, redirecting to login");
            return;
        }
        // // console.log("coookies", coookies);
        if (coookies?.refreshToken) {
            const response = await api.post('/user/refreshToken', { refreshToken: coookies.refreshToken });
            // // console.log("response refresh token", response.data);
            if (response.status === 200) {
                document.cookie = `accessToken=${response.data.accessToken}; path=/; max-age=604800;`;
            } else if (!response.data.success) {
                // // console.log("Refresh token expired or invalid, redirecting to login");
                clearCookies();

                window.location.href = '/';
            }
        }
    } catch (error) {
        // console.log("Error updating access token:", error);
        if (error.response && error.response.status === 405) {
            // console.log("Refresh token expired or invalid, redirecting to login");
            clearCookies();
            // Clear all authentication cookies
            // document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            // document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';

            // Redirect to login page
            window.location.href = '/';
            return;
        }
        // console.error('Error updating access token:', error);
        // throw error;
    }
};

export const loginWithOtp = async (data) => {
    try {
        const response = await api.post("/user/loginSendOtp", data);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
};
export const verifyLoginOtp = async (data) => {
    try {
        const response = await api.post("/user/verifyLoginOtp", data);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
};
export const resendLoginOtp = async (data) => {
    try {
        const response = await api.post("/user/resendLoginOtp", data);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
};
export const logoutUser = async (data) => {
    try {
        const response = await api.post("/user/logout", data);
        if (response.status === 200) {
            clearCookies();
        }
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
};


export const getUserDetails = async (id) => {
    try {
        const response = await api.get(`/user/get/userById/${id}`);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
};
export const verifySignupOtp = async (data) => {
    try {
        const response = await api.post("/user/verify-otp", data);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
};

export const resendSignupOtp = async (data) => {
    try {
        const response = await api.post("/user/resend-otp", data);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
};

export const getUserByUserId = async (id) => {
    try {
        const response = await api.get(`/user/get/userById/${id}`);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
};

export const updateUserById = async (id, data) => {
    try {
        const response = await api.put(`/user/updateUser/${id}`, data);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
};

export const getNoOfStudents = async () => {
    try {
        const response = await api.get('/student/total');
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
};

export const generatePhoneOtp = async (data) => {
    try {
        const response = await api.post("/user/sendPhoneOtp", data);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
};

export const verifyPhoneOtp = async (data) => {
    try {
        const response = await api.post("/user/verifyPhoneOtp", data);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
};

export const resendPhoneOtp = async (data) => {
    try {
        const response = await api.post("/user/resendPhoneOtp", data);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
};

export const forceLogin = async (data) => {
    try {
        const response = await api.post("/user/forceLogin", data);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

export const changePasswordOtpSend = async (data) => {
    try {
        const response = await api.post("/user/sendChangePasswordOtp", data);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

export const resendChangePasswordOtp = async (data) => {
    try {
        const response = await api.post("/user/resendChangePasswordOtp", data);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

export const verifyChangePasswordOtp = async (data) => {
    try {
        const response = await api.post("/user/verifyChangePasswordOtp", data);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

export const collectQuestionPaperDetails = async (data) => {
    try {
        const response = await api.post("/user/send/paperDownloadMail", data);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

export const createSubAdmin = async (data) => {
    try {
        const response = await api.post("/user/create/sub/Admin", data);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

export const updateSubAdmin = async (id,data) => {
    try {
        const response = await api.put(`/user/update/sub/Admin/${id}` ,data);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

export const resetAdminPassword = async (id,data) => {
    try {
        const response = await api.put(`/user/reset/adminPassword/${id}`, data);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}   
export const deleteSubAdmin = async (id) => {
    try {
        const response = await api.delete(`/user/delete/sub/Admin/${id}`);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

export const getAllAdmins = async () => {
    try {
        const response = await api.get("/user/get/sub/Admins");
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

export const sendForgotPasswordOtp = async (data) => {
    try {
        const response = await api.post("/user/send/forgotPasswordOtp", data);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

export const resendForgotPasswordOtp = async (data) => {
    try {
        const response = await api.post("/user/resend/forgotPasswordOtp", data);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

export const verifyForgotPasswordOtp = async (data) => {
    try {
        const response = await api.post("/user/verify/forgotPasswordOtp", data);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

export const resetPassword = async (data) => {
    try {
        const response = await api.put("/user/reset/password", data);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

export const getBackendAssets = async (file) => {
    try {
        const response = await api.get(`/api/project/resource/pdf?fileKey=${file}`);
        // console.log("response", response.data);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}