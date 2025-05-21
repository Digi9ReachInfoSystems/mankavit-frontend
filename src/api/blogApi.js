import api from "../config/axiosConfig";

export const createBlog = async (data) => {
    try {
        const response = await api.post("/blog/create", data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAllBlogs = async () => {
    try {
        console.log("getAllBlogs");
        const response = await api.get("/blog/getAllBlogs");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getBlogById = async (id) => {
    try {
        const response = await api.get(`/blog/getBlogById/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateBlogById = async (id, data) => {
    try {
        const response = await api.put(`/blog/updateBlog/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteBlogById = async (id) => {
    try {
        const response = await api.delete(`/blog/deleteBlog/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};