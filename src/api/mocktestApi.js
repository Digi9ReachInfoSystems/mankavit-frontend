import { data } from "react-router-dom";
import api from "../config/axiosConfig";

export const createMocktest = async(data) =>{
    try{
        const response = await api.post('/mockTest',data);
        return response.data;
    }catch(error){
        throw error;
    }
}

export const getAllMocktest = async() =>{
    try{
        const response = await api.get('/mockTest/get/allMockTests');
        return response.data;
    }catch(error){
        throw error;
    }
}


export const getMocktestById = async(id) =>{
    try{
        const response = await api.get(`/mockTest/${id}`);
        return response.data;
    }catch(error){
        throw error;
    }
}

export const deleteMocktestById = async(id) =>{
    try{
        const response = await api.delete(`/mockTest/delete/${id}`);
        return response.data;
    }catch(error){
        throw error;
    }
}

export const getMocktestBySubjectId = async(id) =>{
    try{
        const response = await api.get(`/mockTest/get/subjects/${id}`);
        return response.data;
    }catch(error){
        throw error;
    }
}


export const updateMocktestById = async(id,data) =>{
    try{
        const response = await api.put(`/mockTest/update/${id}`,data);
        return response.data;
    }catch(error){
        throw error;
    }
}

export const publishMocktestById = async(id,publish) =>{
    try{
        const response = await api.put(`/mockTest/publish/${id}`,{publish});
        return response.data;
    }catch(error){
        throw error;
    }
}


export const startMocktest = async(data) =>{
    try{
        const response = await api.post('/userAttempt/start',data);
        return response.data;
    }catch(error){
        throw error;
    }
}

export const saveMocktest = async(data) =>{
    try{
        const response = await api.put('/userAttempt/save',data);
        return response.data;
    }catch(error){
        throw error;
    }
}

export const submitMocktest = async(data) =>{
    try{
        const response = await api.put('/userAttempt/submit',data);
        return response.data;
    }catch(error){
        throw error;
    }
}

export const getMocktestAttempts = async(user_id,mockTestId) =>{
    try{
        const response = await api.get(`/userAttempt/get/user/${user_id}/${mockTestId}`);
        return response.data;
    }catch(error){
        throw error;
    }
}

export const evaluateMocktest = async(data) =>{
    try{
        const response = await api.put('/userAttempt/evaluate',data);
        return response.data;
    }catch(error){
        throw error;
    }
}


export const getUserAnswerByMocktestIdandSubjectId = async(mockTestId,subjectId) =>{
    try{
        const response = await api.get(`/userRanking/${mockTestId}/${subjectId}`);
        return response.data;
    }catch(error){
        throw error;
    }
}

export const getAttemptById = async(attemptId) =>{
    try{
        const response = await api.get(`/userAttempt/${attemptId}`);
        return response.data;
    }catch(error){
        throw error;
    }
}