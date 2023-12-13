import axios from 'axios';

const API_URL = 'http://localhost:7163/api/Ticket';

export const getAllTickets = async () => {
    try {
        const response = await axios.get(`${API_URL}/getAllTickets`);
        return response.data;
    } catch (error) {
        console.error('Error fetching tickets data:', error);
        throw error;
    }
};

export const getTicketById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/getTicket/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching ticket with id ${id}:`, error);
        throw error;
    }
};

export const createTicket = async (purchaseDate, seatId, screeningId, userId) => {
    const data = {
        "purchaseDate": purchaseDate,
        "seatId": seatId,
        "screeningId": screeningId,
        "userId": userId
    };

    try {
        const response = await axios.post(`${API_URL}/createTicket`, data);
        return response.data;
    } catch (error) {
        console.error('Error creating ticket:', error);
        throw error;
    }
};

export const editTicket = async (id, ticketData) => {
    try {
        const url = `${API_URL}/editTicket/${id}`;
        await axios.put(url, ticketData);
    } catch (error) {
        console.error(`Error editing ticket with id ${id}:`, error);
        throw error;
    }
};

export const deleteTicket = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/deleteTicket/${id}`);
        if (response.status === 204) {
            return true;
        }
        throw new Error(`Error deleting ticket with id ${id}`);
    } catch (error) {
        console.error(`Error deleting ticket with id ${id}:`, error);
        throw error;
    }
};
