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
        console.log(error);
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
        console.log(error);
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
        console.log(error);
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
        console.log(error);
        throw error;
    }
};