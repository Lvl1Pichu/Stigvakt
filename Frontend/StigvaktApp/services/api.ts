import axios from 'axios';
import { getAuth } from 'firebase/auth';

// Replace with your actual backend API URL
const API_URL = 'https://localhost:7075/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to add auth token to requests when available
apiClient.interceptors.request.use(async (config) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  } catch (error) {
    console.error('Error setting auth token:', error);
    return config;
  }
});

export const authService = {
  verifyToken: async (idToken: string) => {
    return apiClient.post('/auth/verify', { idToken });
  },
  
  testAuth: async () => {
    return apiClient.get('/auth/test');
  }
};

export const trailService = {
  getTrails: async () => {
    return apiClient.get('/trails');
  },
  
  reportIssue: async (issue: {
    trailId: number,
    location: string,
    description: string,
    imageUrl?: string
  }) => {
    return apiClient.post('/trails', issue);
  },
  
  getUserReports: async () => {
    return apiClient.get('/trails/user-reports');
  }
};
