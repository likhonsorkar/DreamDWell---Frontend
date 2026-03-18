import axios from "axios";
const apiClient = axios.create({
    baseURL: "https://house-for-rent-django-backend.vercel.app/api",
});
export default apiClient;