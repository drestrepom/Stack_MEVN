// Importición del módulo axios
import axios from 'axios';
// URL base del servidor (API REST)
const BASE_URL = 'http://localhost:5000';

// Solicita todas las notas
export async function getNotes() {
    try {
        // Hace una petición GET para obtener todas las notas
        const response = await axios.get(`${BASE_URL}/api/note/list`);
        // Si no ocurre un error retorna las notas que envía el servidor
        return response.data;
    } catch (err) {
        //En caso de que ocurra un error lo retorna
        return await Promise.reject(err.message);
    }

}

// Borra la nota que coincida con el id que se le pase como parámetro
export async function deleteNote(id) {
    try {
        // Hace una petición delete para eliminar una nota
        const response = await axios.delete(`${BASE_URL}/api/note/delete/${id}`);
        // SI no ocurre ningún error retorna la respuesta del servidor
        return response.data;
    } catch (err) {
        //En caso de que ocurra un error lo retorna
        return await Promise.reject(err.message);
    }
}

// Crea una nueva nota
export async function createNote(data) {
    try {
        // hace una petición POST para crear una nueva nota
        const response = await axios.post(`${BASE_URL}/api/note/create`, {title: data.title, body: data.body});
        // En caso de que no ocurra un error retorna la nota creada
        return response.data;
    } catch (err) {
        //En caso de que ocurra un error lo retorna
        return await Promise.reject(err.message);
    }
}

// Actualiza la nota que se le pase por parámetro
export async function updateNote(data, id) {
    try {
        // Hace una petición PUT para actualizar una nota
        const response = await axios.put(`${BASE_URL}/api/note/update/${id}`, {data});
        // En caso de que no ocurra un error retorna la nota actualizada
        return response.data;
    } catch (err) {
        //En caso de que ocurra un error lo retorna
        return await Promise.reject(err.message);
    }
}
