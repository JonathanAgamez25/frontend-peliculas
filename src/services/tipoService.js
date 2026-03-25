import axios from "axios";

const API = "https://api-peliculas-production-7b14.up.railway.app/api/tipos";

export const getTipos = () => axios.get(API);
export const getTipoById = (id) => axios.get(`${API}/${id}`);
export const createTipo = (data) => axios.post(API, data);
export const updateTipo = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteTipo = (id) => axios.delete(`${API}/${id}`);
