import axios from "axios";

const DOTNET_API_URL = import.meta.env.VITE_DOTNET_API_URL;
const NODE_API_URL = import.meta.env.VITE_NODE_API_URL;

// Create axios instance
const httpClient = axios.create({
  baseURL: DOTNET_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Create separate instance for Node.js API
export const httpClient = axios.create({
  baseURL: NODE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for main API
httpClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for main API
httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      // Server responded with error status
      console.error("API Error:", error.response.data);

      // Handle specific status codes
      switch (error.response.status) {
        case 401:
          // Unauthorized - redirect to login
          console.error("Unauthorized access");
          break;
        case 404:
          console.error("Resource not found");
          break;
        case 500:
          console.error("Server error");
          break;
      }
    } else if (error.request) {
      // Request made but no response
      console.error("No response from server");
    } else {
      // Error in request setup
      console.error("Request error:", error.message);
    }

    return Promise.reject(error);
  },
);

// Request interceptor for Node API
httpClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for Node API
httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      console.error("Node API Error:", error.response.data);
    } else if (error.request) {
      console.error("No response from Node server");
    } else {
      console.error("Request error:", error.message);
    }

    return Promise.reject(error);
  },
);

export default httpClient;
