import api from "../config/axiosConfig";

export const startCourse = async (user_id,course_id) => {
    try {
        const response = await api.post(`/userProgress/startCourse`,
            {
                user_id: user_id,
                course_id: course_id
            }
        );
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
};

export const startSubject = async (user_id,course_id,subject_id) => {
    try {
        const response = await api.post(`/userProgress/startSubject`,
            {
                user_id: user_id,
                course_id: course_id,
                subject_id: subject_id
            }
        );
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
};

export const startLecturer = async (user_id,course_id,subject_id,lecturer_id) => {
    try {
        const response = await api.post(`/userProgress/startLecture`,
            {
                user_id: user_id,
                course_id: course_id,
                subject_id: subject_id,
                lecturer_id: lecturer_id
            }
        );
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
};

export const completeLecturer = async (user_id,course_id,subject_id,lecturer_id) => {
    try {
        const response = await api.post(`/userProgress/completeLecture`,
            {
                user_id: user_id,
                course_id: course_id,
                subject_id: subject_id,
                lecturer_id: lecturer_id
            }
        );
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
};

export const completeSubject = async (user_id,course_id,subject_id) => {
    try {
        const response = await api.post(`/userProgress/completeSubject`,
            {
                user_id: user_id,
                course_id: course_id,
                subject_id: subject_id
            }
        );
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
};

export const completeCourse = async (user_id,course_id) => {
    try {
        const response = await api.post(`/userProgress/completeCourse`,
            {
                user_id: user_id,
                course_id: course_id
            }
        );
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
};

export const getCourseByIdWithUSerProgress = async (user_id,course_id) => {
    try {
        const response = await api.post(`/api/v1/course/coursebyId/withUserProgress`,
            {
            userId: user_id,
            courseId: course_id
            }
        );
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}
export const updateViewCertificate = async (user_id,course_id) => {
    try {
        const response = await api.put(`/userProgress/updateview`,
            {
                user_id: user_id,
                course_id: course_id
            }
        );
        return response.data;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}