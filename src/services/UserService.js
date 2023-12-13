import axios from 'axios';

const API_URL = 'https://localhost:7163/api/User';

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/getAllUsers`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users data:', error);
    }
};

export const getUserById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/getUser/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching user with id ${id}:`, error);
    }
};

export const addUser = async (userName, emailAdress, phoneNumber, password, userRole) => {
    const data = {
        "userName": userName,
        "emailAdress": emailAdress,
        "phoneNumber": phoneNumber,
        "password": password,
        "userRole": userRole
    };

    try {
        const response = await axios.post(`${API_URL}/createUser`, data);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
    }
};

export const editUser = async (id, userData) => {
    try {
        const url = `${API_URL}/editUser/${id}`;
        await axios.put(url, userData);
    } catch (error) {
        console.error(`Error editing user with id ${id}:`, error);
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/deleteUser/${id}`);
        if (response.status === 204) {
            return true;
        }
        throw new Error(`Error deleting user with id ${id}`);
    } catch (error) {
        console.error(`Error deleting user with id ${id}:`, error);
    }
};