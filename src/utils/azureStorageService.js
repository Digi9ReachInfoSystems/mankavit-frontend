import api from "../config/axiosConfig";



export const uploadFileToAzureStorage = async (file, containerName) => {
    console.log("file", file);
    console.log("containerName", containerName);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("containerName", containerName);
    console.log("formData", formData);

    try {
        const response = await api.post("/upload/uploadData", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};