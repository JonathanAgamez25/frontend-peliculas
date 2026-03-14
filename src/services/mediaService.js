import axios from "axios";

const API = "http://localhost:3000/api/medias";

export const getMedias = () => axios.get(API);
export const getMediaById = (id) => axios.get(`${API}/${id}`);
export const createMedia = (data) => axios.post(API, data);
export const updateMedia = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteMedia = (id) => axios.delete(`${API}/${id}`);
