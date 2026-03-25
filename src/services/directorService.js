import axios from "axios";

const API = "https://api-peliculas-production-7b14.up.railway.app/api/directores";

export const getDirectores = () => axios.get(API);
export const getDirectorById = (id) => axios.get(`${API}/${id}`);
export const createDirector = (data) => axios.post(API, data);
export const updateDirector = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteDirector = (id) => axios.delete(`${API}/${id}`);
