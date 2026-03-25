import axios from "axios";

const API = "https://api-peliculas-production-7b14.up.railway.app/api/medias";

export const getMedias = () => axios.get(API);
export const getMediaById = (id) => axios.get(`${API}/${id}`);
export const createMedia = (data) => axios.post(API, data);
export const updateMedia = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteMedia = (id) => axios.delete(`${API}/${id}`);
