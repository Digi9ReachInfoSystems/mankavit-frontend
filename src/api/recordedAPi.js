import api from "../config/axiosConfig";

export const createRecordedClass = async (data) => {
   try{
    console.log("Data api",data);
    const response = await api.post("/recordedSession", data);
    return response.data;
   }catch(error){
    console.log("error api",error);
    throw error;
   }
};

export const getAllRecordedClasses = async () => {
    try{
     const response = await api.get("/recordedSession/");
     return response.data;
    }catch(error){
     throw error;
    }
 };

 export const getRecordedClassById = async (id) => {
    try{
     const response = await api.get(`/recordedSession/${id}`);
     return response.data;
    }catch(error){
     throw error;
    }
 };

 export const updateRecordedClassById = async (id, data) => {
    try{
     const response = await api.put(`/recordedSession/${id}`, data);
     return response.data;
    }catch(error){
     throw error;
    }
 };

 export const deleteRecordedClassById = async (id) => {
    try{
     const response = await api.delete(`/recordedSession/${id}`);
     return response.data;
    }catch(error){
     throw error;
    }
 };