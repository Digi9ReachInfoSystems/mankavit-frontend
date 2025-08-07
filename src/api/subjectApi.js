import api from "../config/axiosConfig";

export const getSubjects = async () => {
    try {
        const response = await api.get('/api/v1/subject/');
        return response.data;
    } catch (error) {
        console.error('Error fetching subjects:', error);
        throw error;
    }
};

export const createSubject = async (data) => {
    try {
        const response = await api.post('/api/v1/subject', data);
        return response.data;
    } catch (error) {
        console.error('Error creating subject:', error);
        throw error;
    }
};

export const getSubjectById = async (id) => {
    try {
        const response = await api.get(`/api/v1/subject/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching subject by ID:', error);
        throw error;
    }
};

export const updateSubjectById = async (id, data) => {
    try {
        const response = await api.put(`/api/v1/subject/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating subject by ID:', error);
        throw error;
    }
};

export const deleteSubjectByid = async (id) => {
    try {
        const response = await api.delete(`/api/v1/subject/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting subject by ID:', error);
        throw error;
    }
};

export const getNoOfSubjects = async () => {
    try {
        const response = await api.get('/api/v1/subject/total');
        return response.data;
    } catch (error) {
        console.error('Error fetching number of subjects:', error);
        throw error;
    }
};
export const bulkDeleteSubjects = async (subjectIds) => {
    try {
        
        
        // Proper axios DELETE request with data in the correct format
        const response = await api.delete('/api/v1/subject/bulk/delete', {
            data: { subjectIds },  // Axios requires DELETE payload to be in 'data'
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // If using auth
            }
        });
        
        return response.data;
    } catch (error) {
        // Enhanced error logging
        console.error('Error bulk deleting subjects:', {
            message: error.message,
            response: error.response?.data,
            stack: error.stack
        });
        throw error;
    }
}

export const getSubjectsByCourseId = async (courseId) => {
    try {
        const response = await api.get(`/api/v1/subject/getCourseBySubject/${courseId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching subject by course ID:', error);
        throw error;
    }
};


export const rearrangeSubjects = async (subjectIds) => {
  try {
    console.log('Sending subjectIds:', subjectIds); // Debug log
    const response = await api.put('/api/v1/subject/subjects/rearrangeSubjects', 
      { subjectIds },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    console.log('API Response:', response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
};