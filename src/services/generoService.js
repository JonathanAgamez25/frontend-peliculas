import axios from "axios";

const API = "http://localhost:3000/api/generos";

export const getGeneros = () => axios.get(API);
export const getGeneroById = (id) => axios.get(`${API}/${id}`);
export const createGenero = (data) => axios.post(API, data);
export const updateGenero = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteGenero = (id) => axios.delete(`${API}/${id}`);
