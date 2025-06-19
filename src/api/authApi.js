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
        console.log(error);
        throw error;
    }
}; 

export const updateAccessToken = async () => {   
    console.log("updateAccessToken"); 
    try {
        const coookies = getCookiesData();
        if (!coookies) {
            return;
        }   
        if (coookies?.refreshToken) {
            const response = await api.post('/user/refreshToken',{refreshToken:coookies.refreshToken});
            if (response.status === 200) {  
                document.cookie = `accessToken=${response.data.accessToken}; path=/; max-age=604800;`;
            }
        }
    } catch (error) {
        //console.error('Error updating access token:', error);
        throw error;
    }
};

export const loginWithOtp = async (data) => {
    try {
        const response = await api.post("/user/loginSendOtp", data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const verifyLoginOtp = async (data) => {
    try {
        const response = await api.post("/user/verifyLoginOtp", data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const resendLoginOtp = async (data) => {
    try {
        const response = await api.post("/user/resendLoginOtp", data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const logoutUser = async (data) => {
    try {
        const response = await api.post("/user/logout", data);
        if(response.status === 200){
            clearCookies();
        }
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


export const getUserDetails = async (id) => {
    try {
        console.log("id inside api",id);
        const response = await api.get(`/user/get/userById/${id}`);
        console.log("response.data",response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const verifySignupOtp = async (data) => {
    try {
        const response = await api.post("/user/verify-otp", data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const resendSignupOtp = async (data) => {
    try {
        const response = await api.post("/user/resend-otp", data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getUserByUserId = async (id) => {
    try {
        const response = await api.get(`/user/get/userById/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateUserById = async (id, data) => {
    try {
        const response = await api.put(`/user/updateUser/${id}`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getNoOfStudents = async () => {
    try {
        const response = await api.get('/student/total');
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};