import axios from 'axios';

const API_URL = 'https://localhost:7163/api/Movie';

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

export const getAllMovies = async () => {
  try {
    const response = await axiosInstance.get('/getAllMovies');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMovieById = async (id) => {
  try {
    const response = await axiosInstance.get(`/getMovie/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editMovie = async (id, movieData) => {
  try {
    await axiosInstance.put(`/editMovie/${id}`, movieData);
  } catch (error) {
    throw error;
  }
};

export const deleteMovie = async (id) => {
  try {
    const response = await axiosInstance.delete(`/deleteMovie/${id}`);
    if (response.status === 204) {
      return true;
    }
    throw new Error(`Error deleting movie with id ${id}`);
  } catch (error) {
    throw error;
  }
};

export const addMovie = async (
  title,
  description,
  duration,
  actors,
  genres,
  directors,
  movieLanguage
) => {
  const data = {
    title,
    description,
    duration,
    actors,
    genres,
    directors,
    movieLanguage,
  };

  try {
    await axiosInstance.post('/createMovie', data);
    return true;
  } catch (error) {
    return false;
  }
};
