import axios from "axios";

const API = "https://api-peliculas-production-7b14.up.railway.app/api/generos";

export const getGeneros = () => axios.get(API);
export const getGeneroById = (id) => axios.get(`${API}/${id}`);
export const createGenero = (data) => axios.post(API, data);
export const updateGenero = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteGenero = (id) => axios.delete(`${API}/${id}`);
