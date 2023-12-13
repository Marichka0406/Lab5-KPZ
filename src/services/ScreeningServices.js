import axios from 'axios';

const API_URL = 'https://localhost:7163/api/Screening';

export const getAllScreenings = async () => {
    try {
        const response = await axios.get(`${API_URL}/getAllScreenings`);
        return response.data;
    } catch (error) {
        console.error('Error fetching screening data:', error);
        throw error;
    }
};

export const getScreeningById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/getScreening/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching screening with id ${id}:`, error);
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
        const response = await axios.post(`${API_URL}/createScreening`, data);
        return response.data;
    } catch (error) {
        console.error('Error creating screening:', error);
        throw error;
    }
};;

export const editScreening = async (id, screeningData) => {
    try {
        const url = `${API_URL}/editScreening/${id}`;
        await axios.put(url, screeningData);
    } catch (error) {
        console.error(`Error editing screening with id ${id}:`, error);
        throw error;
    }
};

export const deleteScreening = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/deleteScreening/${id}`);
        if (response.status === 204) {
            return true;
        }
        throw new Error(`Error deleting screening with id ${id}`);
    } catch (error) {
        console.error(`Error deleting screening with id ${id}:`, error);
        throw error;
    }
};
