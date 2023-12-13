import axios from 'axios';

const API_URL = 'http://localhost:7163/api/Seat';

export const getAllSeats = async () => {
    try {
        const response = await axios.get(`${API_URL}/getAllSeats`);
        return response.data;
    } catch (error) {
        console.error('Error fetching seats data:', error);
        throw error;
    }
};

export const getSeatById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/getSeat/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching seat with id ${id}:`, error);
        throw error;
    }
};

export const createSeat = async (seatName, hallId) => {
    const data = {
        "seatName": seatName,
        "hallId": hallId
    };

    try {
        const response = await axios.post(`${API_URL}/createSeat`, data);
        return response.data;
    } catch (error) {
        console.error('Error creating seat:', error);
        throw error;
    }
};

export const editSeat = async (id, seatData) => {
    try {
        const url = `${API_URL}/editSeat/${id}`;
        await axios.put(url, seatData);
    } catch (error) {
        console.error(`Error editing seat with id ${id}:`, error);
        throw error;
    }
};

export const deleteSeat = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/deleteSeat/${id}`);
        if (response.status === 204) {
            return true;
        }
        throw new Error(`Error deleting seat with id ${id}`);
    } catch (error) {
        console.error(`Error deleting seat with id ${id}:`, error);
        throw error;
    }
};
