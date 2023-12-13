import axios from 'axios';

const API_URL = 'https://localhost:7163/api/Seat';

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

export const getAllSeats = async () => {
  try {
    const response = await axiosInstance.get('/getAllSeats');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSeatById = async (id) => {
  try {
    const response = await axiosInstance.get(`/getSeat/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addSeat = async (seatName, hallId) => {
  const data = {
    "seatName": seatName,
    "hallId": hallId
  };

  try {
    const response = await axiosInstance.post('/createSeat', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editSeat = async (id, seatData) => {
  try {
    const url = `/editSeat/${id}`;
    await axiosInstance.put(url, seatData);
  } catch (error) {
    throw error;
  }
};

export const deleteSeat = async (id) => {
  try {
    const response = await axiosInstance.delete(`/deleteSeat/${id}`);
    if (response.status === 204) {
      return true;
    }
    throw new Error(`Error deleting seat with id ${id}`);
  } catch (error) {
    throw error;
  }
};
