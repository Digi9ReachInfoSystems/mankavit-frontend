import api from "../config/axiosConfig";

export const createYoutube = async (data) => {
  try {
    const response = await api.post("/socialMediaLinks/addYoutubeVideoLink", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to create YouTube link");
    }
    
    return response.data;
  } catch (error) {
    console.error("API Error:", {
      url: "/socialMediaLinks/addYoutubeVideoLink",
      error: error.response?.data || error.message,
    });
    throw error;
  }
};

export const getAllYoutube = async () => {
try {
    const response = await api.get("/socialMediaLinks/getAllYoutubeVideoLinks");
    return response.data;
} catch (error) {
    throw error;
}
};

export const deleteYoutube = async (id) => {
try {
    const response = await api.delete(`/socialMediaLinks/removeYoutubeVideoLink/${id}`);
    return response.data;
} catch (error) {
    throw error;
}
};


export const updateSocialMediaLinks = async (data) => {
  try {
    const response = await api.put("/socialMediaLinks/updateSocialMediaLinks", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSocialMediaLinks = async () => {
  try {
    const response = await api.get("/socialMediaLinks/getAllSocialMediaLinks");
    return response.data;
  } catch (error) {
    throw error;
  }
};