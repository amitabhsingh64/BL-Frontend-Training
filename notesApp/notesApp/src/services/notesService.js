import axios from 'axios';

// endpoint
const BASE_URL = "http://localhost:3001/notes";

/**
 * Fetch all notes from the database.
 */
export const getNotes = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching notes in service:", error);
        throw error;
    }
};
export const createNote = async (noteData) => {
    try {
        const response = await axios.post(BASE_URL, noteData);
        return response.data;
    } catch (error) {
        console.error("Error creating note in service:", error);
        throw error;
    }
};
export const updateNote = async (id, data) => {
    try {
        const response = await axios.patch(`${BASE_URL}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error updating note ${id} in service:`, error);
        throw error;
    }
};
export const deleteNote = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting note ${id} in service:`, error);
        throw error;
    }
};