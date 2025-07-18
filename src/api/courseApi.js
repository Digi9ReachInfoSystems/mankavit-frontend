import api from '../config/axiosConfig'

export const createCourse = async (data) => {
    try {
        const response = await api.post("/api/v1/course", data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getAllCourses = async () => {
    try {
        const response = await api.get("/api/v1/course");
        console.log("response", response);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};



export const getCourseById = async (id) => {
    try {
        console.log(id);
        const response = await api.get(`/api/v1/course/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteCourseById = async (id) => {
    try {
        const response = await api.delete(`/api/v1/course/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateCourseById = async (id, data) => {
    try {
        const response = await api.put(`/api/v1/course/${id}`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


export const getCourseByCategory = async (categoryName) => {
    try {
        const response = await api.get(`/api/v1/course/category/${categoryName}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getNoOfCourses = async () => {
    try {
        const response = await api.get("/api/v1/course/total");
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getAllUserCourses = async (userID) => {
    try {
        const response = await api.get(`/api/v1/course/getAllCourses/users/${userID}`);
        console.log("response", response);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const getAllUserCourseByCategory = async (userID, categoryName) => {
    try {
        const response = await api.get(`api/v1/course/getAllCourses/users/category/${userID}/${categoryName}`);
        console.log("response", response);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const bulkDeleteCourse = async (courseIds) => {
    try {

        const response = await api.delete('/api/v1/course/bulk/delete', {
            data: { courseIds },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // If using auth
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const getAllCourseAdmin = async () => {
    try {
        const response = await api.get("/api/v1/course/get/allCourses/admin");
        console.log("response", response);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getAllCourseByCategoryName = async (categoryName) => {
    try {
        const response = await api.get(`/api/v1/course/category/${categoryName}`);
        console.log("response", response);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};