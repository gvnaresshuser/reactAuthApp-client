import axiosInstance from "./axios";

export const registerApi = (data) => axiosInstance.post("/auth/register", data);
export const loginApi = (data) => axiosInstance.post("/auth/login", data);
export const profileApi = () => axiosInstance.get("/auth/profile");
////export const refreshTokenApi = () => axiosInstance.post("/auth/refresh-token");
export const logoutApi = () => axiosInstance.post("/auth/logout");
export const logoutAllApi = () => axiosInstance.post("/auth/logout-all");

export const updateProfileApi = (data) =>
  axiosInstance.put("/auth/profile", data);

export const changePasswordApi = (data) =>
  axiosInstance.put("/auth/change-password", data);

export const forgotPasswordApi = (data) =>
  axiosInstance.post("/auth/forgot-password", data);

export const resetPasswordApi = (data) =>
  axiosInstance.post("/auth/reset-password", data);

