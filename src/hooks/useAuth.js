import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
const useAuth = () => {
    const [user, setUser] = useState(null);
    const [errorMSG, setErrorMSG] = useState("");
    const [successMSG, setSuccessMSG] = useState("");
    const getToken = () => {
        const token = localStorage.getItem("authTokens");
        return token ? JSON.parse(token) : null ;
    }
    const [authTokens, setAuthTokens] = useState(getToken());
    useEffect(() => {
        if (authTokens){
            fetchUserProfile();
        }
    }, [authTokens])
    useEffect(() => {
        if (successMSG) {
            const t = setTimeout(() => setSuccessMSG(""), 4000);
            return () => clearTimeout(t);
        }
        if (errorMSG) {
            const t = setTimeout(() => setErrorMSG(""), 4000);
            return () => clearTimeout(t);
        }
    }, [successMSG, errorMSG]);
     const fetchUserProfile = async() => {
        setErrorMSG("");
        try{
            const response = await apiClient.get("/auth/users/me/");
            setUser(response.data);
        }catch (error){
            setErrorMSG(error.response?.data?.detail);
        }
    }
    const updateUserProfile = async(data) => {
        setSuccessMSG("")
        setErrorMSG("");
        try{
            await apiClient.put("/auth/users/me", data);
            setSuccessMSG("Profile Updated")
            return true;
        }catch (error){
            console.log(error);
            setErrorMSG("Server error. Please try again later.")
            return false;
        }
    }
    const ChangePassword = async(data) => {
        setSuccessMSG("")
        setErrorMSG("");
        try{
            await apiClient.post("auth/users/set_password/", data);
            setSuccessMSG("Password Changed Succesfull");
            return true;
        }catch (error){
                console.log(error);
                const errMsg = error.response?.data ? Object.values(error.response.data).flat().join("\n") : "Server Error";
                setErrorMSG(errMsg);
                return false;
        }
    }
    const loginUser = async(userData) =>{
        setSuccessMSG("")
        setErrorMSG("");
        try{
            const response = await apiClient.post("/auth/jwt/create", userData);
            setAuthTokens(response.data)
            localStorage.setItem("authTokens", JSON.stringify(response.data));
            setSuccessMSG("Wellcome Back!")
            return true;
        }catch (error){
             if(error.response && error.response.status == 500){
                setErrorMSG("Server error. Please try again later.");
                return false;
            }
             setErrorMSG(error.response?.data?.detail);
             return false;
        }
    }
    const signupUser = async(userData) =>{
        setSuccessMSG("")
        setErrorMSG("");
        try{
            const response = await apiClient.post("/auth/users/", userData);
            setSuccessMSG("Registration Successful. Check you email inbox/spam to active account");
            if (response.status === 201 || response.status === 200) {
                return true;
            }
        }catch (error) {
            if(error.response && error.response.status == 500){
                setErrorMSG("Server error. Please try again later.");
                return false;
            }
            if (error.response && error.response.data){
                const errMsg = Object.values(error.response.data).flat().join("\n");
                setErrorMSG(errMsg);
                return false;
            }else{
                setErrorMSG("Registration Failed! please try later")
            }
            return false;
        }
    }
    const logoutUser = () => {
        setSuccessMSG("")
        try{
            localStorage.removeItem("authTokens");
            setAuthTokens(null); 
            setUser(null);
            setSuccessMSG("Logout Successful");
            return true;
        }catch(error){
            console.log(error);
            setErrorMSG("Logout not successfull");
            return false;
        }
    }
    const emailActivation = async(data) => {
        try{
            await apiClient.post("/auth/users/activation/", data);
            return true;
        }catch (error) {
            return false;
        }
    }
    const CreateAds = async(data) => {
        setSuccessMSG("")
        setErrorMSG("");
        try{
            const response = await apiClient.post("/ads/", data);
            setSuccessMSG("Property is added! please wait for admin approval. ");
            return response;
        }catch (error){
                console.log(error);
                const errMsg = error.response?.data ? Object.values(error.response.data).flat().join("\n") : "Server Error";
                setErrorMSG(errMsg);
                return null;
        }
    }
    const fetchMyAds = async () => {
        try {
            return await apiClient.get("/myads");
        } catch (error) {
            console.error("Fetch My Ads Error:", error);
            return null;
        }
    }
    const getAdDetails = async (adId) => {
        try {
            return await apiClient.get(`/ads/${adId}/`);
        } catch (error) {
            console.error("Fetch Ad Details Error:", error);
            return null;
        }
    }
    const getAdImages = async (adId) => {
        try {
            return await apiClient.get(`/ads/${adId}/images/`);
        } catch (error) {
            console.error("Fetch Ad Images Error:", error);
            return null;
        }
    }
    const updateAd = async(adId, data) => {
        setSuccessMSG("")
        setErrorMSG("");
        try{
            const response = await apiClient.put(`/ads/${adId}/`, data);
            setSuccessMSG("Property updated successfully!");
            return response;
        }catch (error){
                console.log(error);
                const errMsg = error.response?.data ? Object.values(error.response.data).flat().join("\n") : "Server Error";
                setErrorMSG(errMsg);
                return null;
        }
    }
   const AddAdsImage = async (data, adsId) => {
        try {
            const uploadPromises = data.map(image => {
                const formData = new FormData();
                formData.append("image", image);
                return apiClient.post(`/ads/${adsId}/images/`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            });
            const responses = await Promise.all(uploadPromises);
            setSuccessMSG("All images uploaded successfully!");
            return responses[responses.length - 1]; 
        } catch (error) {
            console.error("Upload Error:", error.response?.data || error.message);
            setErrorMSG("Failed to upload some images.");
            throw error;
        }
    };
    const deleteAdImage = async (adId, imageId) => {
        setSuccessMSG("");
        setErrorMSG("");
        try {
            await apiClient.delete(`/ads/${adId}/images/${imageId}/`);
            setSuccessMSG("Image deleted successfully!");
            return true;
        } catch (error) {
            console.error("Delete Error:", error.response?.data || error.message);
            setErrorMSG("Failed to delete image.");
            return false;
        }
    };

    const getReviews = async (adId) => {
        try {
            return await apiClient.get(`/ads/${adId}/reviews/`);
        } catch (error) {
            console.error("Fetch Reviews Error:", error);
            return null;
        }
    }
    const addReview = async (adId, data) => {
        try {
            const response = await apiClient.post(`/ads/${adId}/reviews/`, data);
            setSuccessMSG("Review added successfully!");
            return response;
        } catch (error) {
            console.error("Add Review Error:", error);
            const errMsg = error.response?.data ? Object.values(error.response.data).flat().join("\n") : "Failed to submit review.";
            setErrorMSG(errMsg);
            return null;
        }
    }
    const requestToRent = async (adId) => {
        setSuccessMSG("");
        setErrorMSG("");
        try {
            const response = await apiClient.post(`/ads/${adId}/requests/`, {});
            setSuccessMSG("Rental request sent successfully!");
            return response;
        } catch (error) {
            console.error("Request to Rent Error:", error);
            const errMsg = error.response?.data ? Object.values(error.response.data).flat().join("\n") : "Failed to send rental request.";
            setErrorMSG(errMsg);
            return null;
        }
    }
    const getAdRequests = async (adId) => {
        try {
            return await apiClient.get(`/ads/${adId}/requests/`);
        } catch (error) {
            console.error("Fetch Ad Requests Error:", error);
            return null;
        }
    }
    const acceptRequest = async (adId, requestId) => {
        setSuccessMSG("");
        setErrorMSG("");
        try {
            const response = await apiClient.post(`/ads/${adId}/requests/${requestId}/accept/`, {});
            setSuccessMSG("Rental request accepted successfully!");
            return response;
        } catch (error) {
            console.error("Accept Request Error:", error);
            const errMsg = error.response?.data ? Object.values(error.response.data).flat().join("\n") : "Failed to accept rental request.";
            setErrorMSG(errMsg);
            return null;
        }
    }
    const cancelRequest = async (adId, requestId) => {
        setSuccessMSG("");
        setErrorMSG("");
        try {
            await apiClient.delete(`/ads/${adId}/requests/${requestId}/`);
            setSuccessMSG("Rental request cancelled/rejected successfully!");
            return true;
        } catch (error) {
            console.error("Cancel Request Error:", error);
            const errMsg = error.response?.data ? Object.values(error.response.data).flat().join("\n") : "Failed to cancel/reject rental request.";
            setErrorMSG(errMsg);
            return false;
        }
    }
    const getUserProfile = async (userId) => {
        try {
            return await apiClient.get(`/profile/${userId}/`);
        } catch (error) {
            console.error("Fetch User Profile Error:", error);
            return null;
        }
    }
    return { addReview, getReviews, getAdImages, getAdDetails, fetchMyAds, AddAdsImage, user, errorMSG,  setErrorMSG, successMSG, setSuccessMSG,  logoutUser, loginUser, signupUser, updateUserProfile, ChangePassword,  emailActivation, CreateAds, authTokens, updateAd, deleteAdImage, requestToRent, getAdRequests, acceptRequest, cancelRequest, getUserProfile};
}
export default useAuth;