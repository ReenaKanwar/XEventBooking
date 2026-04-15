import axios from 'axios';

const BASE_URL = 'https://eventdata.onrender.com';

export const getStates = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/states`);
        return response.data;
    } catch (error) {
        console.error("Error fetching states:", error);
        throw error;
    }
};

export const getCities = async (state) => {
    try {
        const response = await axios.get(`${BASE_URL}/cities/${state}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching cities for ${state}:`, error);
        throw error;
    }
};

export const getEvents = async (state, city) => {
    try {
        const response = await axios.get(`${BASE_URL}/events`, {
            params: { state, city }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching events:", error);
        throw error;
    }
};

export const getEventById = async (id) => {
    try {
        // Find the specific event. Without a direct endpoint, we fetch all and filter.
        const response = await axios.get(`${BASE_URL}/events`);
        return response.data.find(event => event.id === id || event._id === id);
    } catch (error) {
        console.error("Error fetching event by id:", error);
        throw error;
    }
}
