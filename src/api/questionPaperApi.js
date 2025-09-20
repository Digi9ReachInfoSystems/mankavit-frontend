import api from '../config/axiosConfig'

export const createQuestionPaper = async (data) => {
    try {
        const response = await api.post(`/question/create`, data);
        // console.log(response.data);
        return response.data;
       
    } catch (error) {
        // console.log(error);
        throw error;
    }
}


export const getAllQuestionPapers = async () => {
    try {
        const response = await api.get(`/question/getAllQuestionpapers`);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}


export const getQuestionPaperById = async (id) => {
    try {
        const response = await api.get(`/question/getQuestionPaperById/${id}`);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

export const updateQuestionPaperById = async (id, data) => {
    try {
        const response = await api.put(`/question/updateQuestionPaper/${id}`, data);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

// export const deleteQuestionPaper = async (title,year) => {
//     try {
//         const response = await api.delete(`/question/deleteQuestionPaper/${title}/papers/${year}`);
//         return response.data;
//     } catch (error) {
//         // console.log(error);
//         throw error;
//     }
// }
export const deleteQuestionPaper = async (title, year) => {
  const url = `/question/deleteQuestionPaper/${title}/papers/${year}`;
  console.log("[deleteQuestionPaper] URL =>", url); // TEMP: verify the exact path
  try {
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    console.error("[deleteQuestionPaper] failed:", error);
    throw error;
  }
};


export const removeQuestionpaper = async (title, year) => {
    try {
        const response = await api.put(`/question/removeQuestionPaper/${title}/${year}`);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

export const addExistingTitlePaper = async (title,data) => {
    try {
        // console.log("DSata",data);
        const response = await api.put(`/question/addQuestionPaper/${title}`,data);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}


export const getQuestionPaperByTitleAndYear = async (title, year) => {
    try {
        const response = await api.get(`/question/getQuestionPaperByTitleAndYear/${title}/${year}`);
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}