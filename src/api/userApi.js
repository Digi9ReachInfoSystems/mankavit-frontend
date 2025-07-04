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

export const studentBulkDelete = (userIds) => {
   try{
    const response = api.delete("/user/bulkDelete", {
      data: { userIds },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // If using auth
      }
    });
    return response.data;
   }catch(error){
    throw error;
   }
}

export const deleteStudentById = (id) => {
   try{
    const response = api.delete(`/user/delete/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // If using auth
      }
    });
    return response.data;
   }catch(error){
    throw error;
   }
}

export const forceUserLogout = async(data) => {
   try{
    const response = await api.post("/user/logout", data);
    return response.data;
   }catch(error){
    throw error;
   }
}