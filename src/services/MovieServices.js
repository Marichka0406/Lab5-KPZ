import axios from 'axios';

const API_URL = 'http://localhost:7163/api/Movie';

export const getAllMovies = async () => {
    try {
    const response = await axios.get(`${API_URL}/getAllMovies`);
    return response.data;
} catch (error) {
    console.error('Error fetching movie data:', error);
    throw error;
    }
};

export const getMovieById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/getMovie/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching customer with id ${id}:`, error);
        throw error;
    }
}


export const  editMovie = async (id, movieData) => {
    try {
        const url = `${API_URL}/editMovie/${id}`;
        await axios.put(url, movieData);
    } catch (error) {
        console.error(`Error editing movie with id ${id}:`, error);
        throw error;
    }
};

export const deleteMovie = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/deleteMovie/${id}`);
        if (response.status === 204) {
        return true;
    }
        throw new Error(`Error deleting movie with id ${id}`);
    } catch (error) {
        console.error(`Error deleting movie with id ${id}:`, error);
        throw error;
    }
};


export const addMovie = async (title, description, duration, actors, genres, directors, movieLanguage ) => {
    const data = {
        "title": title,
        "description": description,
        "duration": duration,
        "actors": actors,
        "genres": genres,
        "directors": directors,
        "movieLanguage": movieLanguage
    };

    try {
        await axios.post(`${API_URL}/createMovie`, data);
        return true; 
    } catch (error) {
        console.log(error);
        return false; 
    }
};