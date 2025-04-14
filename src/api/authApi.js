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
        const response = await api.get(`/get/userById/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};