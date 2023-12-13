import axios from 'axios';

const API_URL = 'https://localhost:7163/api/Ticket';

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

export const getAllTickets = async () => {
  try {
    const response = await axiosInstance.get('/getAllTickets');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTicketById = async (id) => {
  try {
    const response = await axiosInstance.get(`/getTicket/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addTicket = async (purchaseDate, seatId, screeningId, userId) => {
  const data = {
    "purchaseDate": purchaseDate,
    "seatId": seatId,
    "screeningId": screeningId,
    "userId": userId
  };

  try {
    const response = await axiosInstance.post('/createTicket', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editTicket = async (id, ticketData) => {
  try {
    const url = `/editTicket/${id}`;
    await axiosInstance.put(url, ticketData);
  } catch (error) {
    throw error;
  }
};

export const deleteTicket = async (id) => {
  try {
    const response = await axiosInstance.delete(`/deleteTicket/${id}`);
    if (response.status === 204) {
      return true;
    }
    throw new Error(`Error deleting ticket with id ${id}`);
  } catch (error) {
    throw error;
  }
};
