import { data } from "react-router-dom";
import api from "../config/axiosConfig";

export const createMocktest = async (data) => {
    try {
        const response = await api.post('/mockTest', data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getAllMocktest = async () => {
    try {
        const response = await api.get('/mockTest/get/allMockTests');
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const getMocktestById = async (id) => {
    try {
        const response = await api.get(`/mockTest/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteMocktestById = async (id) => {
    try {
        const response = await api.delete(`/mockTest/delete/mocktestById/${id}`);

        console.log('Delete API Response:', {
            status: response.status,
            data: response.data
        });

        if (!response.data) {
            throw new Error('Empty response from server');
        }

        return response.data;
    } catch (error) {
        const errorDetails = {
            request: {
                method: error.config?.method,
                url: error.config?.url,
                headers: error.config?.headers
            },
            response: {
                status: error.response?.status,
                data: error.response?.data,
                headers: error.response?.headers
            },
            message: error.message
        };

        console.error('Delete API Error:', errorDetails);

        // Format a consistent error response
        throw {
            success: false,
            message: error.response?.data?.message || 'Failed to delete mock test',
            details: errorDetails
        };
    }
}
export const getMocktestBySubjectId = async (id) => {
    try {
        const response = await api.get(`/mockTest/get/subjects/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const updateMocktestById = async (id, data) => {
    try {
        const response = await api.put(`/mockTest/update/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const publishMocktestById = async (id, publish) => {
    try {
        const response = await api.put(`/mockTest/publish/${id}`, { publish });
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const startMocktest = async (data) => {
    try {
        const response = await api.post('/userAttempt/start', data);
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const saveMocktest = async (data) => {
    try {
        const response = await api.put('/userAttempt/save', data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const submitMocktest = async (data) => {
    try {
        const response = await api.put('/userAttempt/submit', data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getMocktestAttempts = async (user_id, mockTestId) => {
    try {
        const response = await api.get(`/userAttempt/get/user/${user_id}/${mockTestId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const evaluateMocktest = async (data) => {
    try {
        const response = await api.put('/userAttempt/evaluate', data);
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const getUserAnswerByMocktestIdandSubjectId = async (mockTestId, subjectId) => {
    try {
        const response = await api.get(`/userRanking/${mockTestId}/${subjectId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getAttemptById = async (attemptId) => {
    try {
        const response = await api.get(`/userAttempt/get/byId/${attemptId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getAttemptedUserListByMocktestId = async (mockTestId) => {
    try {
        const response = await api.get(`/userAttempt/get/submitedUser/byMockTest/${mockTestId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const getRankingByMockTestSubject = async (mockTestId, subjectId) => {
    try {
        const response = await api.get(`/userRanking/${mockTestId}/${subjectId}`);
        return response.data;
    } catch (error) {
        throw error
    }
}


export const addmocktestquestions = async (mocktestId, data) => {
    try {
        const response = await api.put(`/mockTest/addQuestion/${mocktestId}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const removemocktestquestions = async (questionId, mocktestId, data) => {
    try {
        const response = await api.put(`/mockTest/removeQuestion/${mocktestId}/${questionId}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updatemocktestquestions = async (questionId, mocktestId, data) => {
    try {
        const response = await api.patch(`/mockTest/editQuestion/${mocktestId}/${questionId}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getAllUserAttempts = async () => {
    try {
        const response = await api.get('/userAttempt/get/getAll/userAttempts');
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getusersAllmocktestsAttempts = async (user_id) => {
    try {
        const response = await api.get(`/userAttempt/get/userAllAttempts/${user_id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getAllUpcomingMocktest = async (userId) => {
    try {
        const response = await api.get(`/mockTest/get/allupcomingMockTests/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const evaluateSingleSubjectiveQuestion = async (data) => {
    try {
        const response = await api.post('/userAttempt/evaluateSingleQuestion', data);
        return response.data;
    } catch (error) {
        throw error;
    }
}



export const rearrangeMocktestQuestions = async (mocktestId, data) => {
    try {
        const response = await api.put(`/mockTest/rearrangeQuestions/${mocktestId}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteUserAttempt = async (attemptId) => {
    try {
        const response = await api.delete(`/userAttempt/delete/attempts`, {
            data: { attemptId },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getAllUserAttemptByUserId = async (userId) => {
    try {
        const response = await api.get(`/userAttempt/get/userAllAttempts/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const viewUserMocktestAttemptResult = async (userId, mockTestId) => {
    try {
        const response = await api.post(
            '/userAttempt/get/userAttemptsByUser',
            { user_id: userId, mockTestId },                             // ← body
            {                                                   // ← config
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            },
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getMocktestBySubjectname = async (subjectName) => {
    try {
        const response = await api.get(`/mockTest/get/getMocktestBySubjectname/${subjectName}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const bulkdeleteMocktest = async (mockTestIds) => {
    try {
        const response = await api.delete('/mockTest/bulkmocktestdelete/delete', {
            data: { mockTestIds },
            // headers: {
            //     'Content-Type': 'application/json',
            //     'Authorization': `Bearer ${localStorage.getItem('token')}` // If using auth
            // }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const rearrangeMocktest = async (data) => {
    try {
        const response = await api.put(`/mockTest/mocktests/rearrangeMocktests`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const bulkdeleteUserAttempts = async (attemptIds) => {
    try {
        const response = await api.delete('/userAttempt/deleteAttempts/attempts/bulkdelete', {
            data: {
                attemptIds: attemptIds // Ensure this matches the backend expectation
            }
        });
        return response.data;
    } catch (error) {
        console.error("Bulk delete error:", error);
        throw error;
    }
}

export const checkMockTestAttempted = async (user_id, mockTestId, subjectId) => {
    try {
        const response = await api.post(`/userAttempt/checkForPausedMockTest`, {
            user_id: user_id,
            mockTestId: mockTestId,
            subject: subjectId
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const saveforLaterMockTestUseAttempt = async (data) => {
    try {
        const response = await api.post('/userAttempt/saveForLater', data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateMocktestLastsavedTime = async (data) => {
    try {
        const response = await api.post(`/userAttempt/updateLastSavedTime`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getMockTestStats = async (user_id, mockTestId) => {
    try {
        const response = await api.post(`/userAttempt/get/mocktest/attemptStats`, { user_id, mockTestId });
        return response.data;
    } catch (error) {
        throw error;
    }
}