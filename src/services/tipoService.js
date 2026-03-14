import axios from "axios";

const API = "http://localhost:3000/api/tipos";

export const getTipos = () => axios.get(API);
export const getTipoById = (id) => axios.get(`${API}/${id}`);
export const createTipo = (data) => axios.post(API, data);
export const updateTipo = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteTipo = (id) => axios.delete(`${API}/${id}`);
