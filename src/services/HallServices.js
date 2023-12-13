import axios from 'axios';

const API_URL = 'https://localhost:7163/api/Hall';

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

export const getAllHalls = async () => {
  try {
    const response = await axiosInstance.get('/getAllHalls');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getHallById = async (id) => {
  try {
    const response = await axiosInstance.get(`/getHall/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addHall = async (hallName, seatsQuantity) => {
  const data = {
    "hallName": hallName,
    "seatsQuantity": seatsQuantity
  };

  try {
    await axiosInstance.post('/createHall', data);
    return true; 
  } catch (error) {
    throw error;
  }
};

export const editHall = async (id, hallData) => {
  try {
    const url = `/editHall/${id}`;
    await axiosInstance.put(url, hallData);
  } catch (error) {
    throw error;
  }
};

export const deleteHall = async (id) => {
  try {
    const response = await axiosInstance.delete(`/deleteHall/${id}`);
    if (response.status === 204) {
      return true;
    }
    throw new Error(`Error deleting hall with id ${id}`);
  } catch (error) {
    throw error;
  }
};
