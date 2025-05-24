import api from "../config/axiosConfig";

export const createStudent = (data) => {
   try{
    const response = api.post("/user/createStudent", data);
    return response;
   }catch(error){
    throw error;
   }
};

export const getAllStudents = () => {
   try{
    const response = api.get("/user/get/all/students");
    return response;
   }catch(error){
    throw error;
   }
};