import axios from 'axios';

const API_URL = 'https://localhost:7163/api/Screening';

// Інтерсептор для обробки помилок
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error:', error);
    return Promise.reject(error);
  }
);

// Створення нового екземпляра Axios з базовим URL
const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const getAllScreenings = async () => {
  try {
    const response = await axiosInstance.get('/getAllScreenings');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getScreeningById = async (id) => {
  try {
    const response = await axiosInstance.get(`/getScreening/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addScreening = async (price, screeningDate, movieId, hallId) => {
  const data = {
    "price": price,
    "screeningDate": screeningDate,
    "movieId": movieId,
    "hallId": hallId
  };

  try {
    const response = await axiosInstance.post('/createScreening', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editScreening = async (id, screeningData) => {
  try {
    const url = `/editScreening/${id}`;
    await axiosInstance.put(url, screeningData);
  } catch (error) {
    throw error;
  }
};

export const deleteScreening = async (id) => {
  try {
    const response = await axiosInstance.delete(`/deleteScreening/${id}`);
    if (response.status === 204) {
      return true;
    }
    throw new Error(`Error deleting screening with id ${id}`);
  } catch (error) {
    throw error;
  }
};
