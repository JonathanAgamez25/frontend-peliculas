import axios from "axios";

const API = "http://localhost:3000/api/productoras";

export const getProductoras = () => axios.get(API);
export const getProductoraById = (id) => axios.get(`${API}/${id}`);
export const createProductora = (data) => axios.post(API, data);
export const updateProductora = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteProductora = (id) => axios.delete(`${API}/${id}`);
