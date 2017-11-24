import axios from "../axiosConfig";

export const getCoinRequest = config => axios.get(``, config);
