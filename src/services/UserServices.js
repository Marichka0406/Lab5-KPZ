import axios from 'axios';

const API_URL = 'https://localhost:7163/api/User';

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

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get('/getAllUsers');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axiosInstance.get(`/getUser/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addUser = async (userName, emailAddress, phoneNumber, password, userRole) => {
  const data = {
    "userName": userName,
    "emailAddress": emailAddress,
    "phoneNumber": phoneNumber,
    "password": password,
    "userRole": userRole
  };

  try {
    const response = await axiosInstance.post('/createUser', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editUser = async (id, userData) => {
  try {
    const url = `/editUser/${id}`;
    await axiosInstance.put(url, userData);
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axiosInstance.delete(`/deleteUser/${id}`);
    if (response.status === 204) {
      return true;
    }
    throw new Error(`Error deleting user with id ${id}`);
  } catch (error) {
    throw error;
  }
};
