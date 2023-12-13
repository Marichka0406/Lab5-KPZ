import axios from 'axios';

const API_URL = 'https://localhost:7163/api/Hall';

export const getAllHalls = async () => {
    try {
        const response = await axios.get(`${API_URL}/getAllHalls`);
        return response.data;
    } catch (error) {
        console.error('Error fetching halls data:', error);
    }
};

export const getHallById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/getHall/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching hall with id ${id}:`, error);
    }
};

export const addHall = async (hallName, seatsQuantity) => {
    const data = {
        "hallName": hallName,
        "seatsQuantity": seatsQuantity
    };

    try {
        const response = await axios.post(`${API_URL}/createHall`, data);
        return response.data;
    } catch (error) {
        console.error('Error creating hall:', error);
    }
};

export const editHall = async (id, hallData) => {
    try {
        const url = `${API_URL}/editHall/${id}`;
        await axios.put(url, hallData);
    } catch (error) {
        console.error(`Error editing hall with id ${id}:`, error);
    }
};

export const deleteHall = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/deleteHall/${id}`);
        if (response.status === 204) {
            return true;
        }
        throw new Error(`Error deleting hall with id ${id}`);
    } catch (error) {
        console.error(`Error deleting hall with id ${id}:`, error);
    }
};