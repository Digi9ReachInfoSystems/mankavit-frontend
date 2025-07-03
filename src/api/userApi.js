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

export const verifyUser = (data) => {
   try{
    const response = api.post("/user/verifyRoles", data);
    return response;
   }catch(error){
    throw error;
   }
}; 

export const addCourseToStudent = (data) => {
   try{
    const response = api.put("/user/addCourseToStudent", data);
    return response;
   }catch(error){
    throw error;
   }
};

export const removeCourseFromStudent = (data) => {
   try{
    const response = api.put("/user/removeCourseFromStudent", data);
    return response;
   }catch(error){
    throw error;
   }
}