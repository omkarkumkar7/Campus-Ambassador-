// api/auth.js
import axios from "axios";

const BASE_URL = "https://masterapi.springfest.in/api/cap/user";

export const registerCA = async (data) => {
  const res = await axios.post(`${BASE_URL}/register_ca`, data);
  return res.data;
};

export const loginCA = async (data) => {
  const res = await axios.post(`${BASE_URL}/login`, data);
  return res.data;
};

export const fetchUserProfile = async (token) => {
  const res = await axios.post(`${BASE_URL}/profile`, { token });
  return res.data;
};
