import axios from "axios";

const API = "http://localhost:3000/api/directores";

export const getDirectores = () => axios.get(API);
export const getDirectorById = (id) => axios.get(`${API}/${id}`);
export const createDirector = (data) => axios.post(API, data);
export const updateDirector = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteDirector = (id) => axios.delete(`${API}/${id}`);
