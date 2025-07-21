import api from "../config/axiosConfig";





export const getMasterOtp = async (data) => {
   try{
      const response = await api.get("/masterOtp/getMasterOTP", );
      return response.data;
   }catch(error){
      throw error.response.data;
   }
}

export const updateMasterOtp = async (data) => {
   try{
      const response = await api.put("/masterOtp/updateMasterOTP", data);
      return response.data;
   }catch(error){
      throw error.response.data;
   }
}