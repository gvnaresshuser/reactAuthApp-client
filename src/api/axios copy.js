import axios from "axios";
import toast from "react-hot-toast";

console.log("API URL:", import.meta.env.VITE_API_URL);

const axiosInstance = axios.create({
  //baseURL: "http://localhost:5000/api",
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
    console.log("🚀 Request Interceptor Fired");
    console.log("URL:", config.url);
  if (accessToken) {
     console.log("Access Token:", accessToken);
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response Interceptor
axiosInstance.interceptors.response.use(
   (response) => {
    console.log("✅ Response Interceptor");
    console.log(response.config.url);
    console.log(response.status);

    return response;
  },
  async (error) => {
     console.log("🚨 Response interceptor fired");
     console.log("Status:", error.response?.status);
      console.log("URL:", error.config?.url);

    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      //const toastId = toast.loading("Refreshing session...");
      const toastId = toast.loading("Refreshing Access Token...", {
        style: {
          background: "#f59e0b",
          color: "#fff",
          border: "1px solid #d97706",
          padding: "16px",
          borderRadius: "12px",
        },
        iconTheme: {
          primary: "#ffffff",
          secondary: "#f59e0b",
        },
      });
      try {
        console.log("🔄 Access Token Expired");
        console.log("Generating New Access Token...");
        // IMPORTANT:
        // Use plain axios here to avoid circular dependency
        const response = await axios.post(
          //"http://localhost:5000/api/auth/refresh-token",
          `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
          {},
          {
            withCredentials: true,
          },
        );
        const newAccessToken = response.data.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        //toast.success("🔄 New Access Token Generated", { id: toastId });
        toast.success("🔄 New Access Token Generated", {
          id: toastId,
          style: {
            background: "#16a34a",
            color: "#fff",
            border: "1px solid #15803d",
            padding: "16px",
            borderRadius: "12px",
          },
          iconTheme: {
            primary: "#ffffff",
            secondary: "#16a34a",
          },
        });
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        console.log("❌ Refresh Token Expired");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        //toast.error("Session Expired. Please Login Again.", { id: toastId });
        toast.error("Session Expired. Please Login Again.", {
          id: toastId,
          style: {
            background: "#dc2626",
            color: "#fff",
            border: "1px solid #b91c1c",
            padding: "16px",
            borderRadius: "12px",
          },
          iconTheme: {
            primary: "#ffffff",
            secondary: "#dc2626",
          },
        });
        //window.location.href = "/login";
        // Redirect after 3 seconds
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);
export default axiosInstance;
