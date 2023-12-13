import axios from 'axios';

// Створюємо новий екземпляр Axios
const apiService = axios.create({
  baseURL: 'https://localhost:7163/api', 
});

// Додавання перехоплювача до екземпляру Axios
apiService.interceptors.request.use(
  (config) => {
    console.log('Request interceptor:', config);
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

apiService.interceptors.response.use(
  (response) => {
    console.log('Response interceptor:', response);
    return response;
  },
  (error) => {

    console.error('Response interceptor error:', error);
    return Promise.reject(error);
  }
);

export default apiService;