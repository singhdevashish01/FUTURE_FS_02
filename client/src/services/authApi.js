import API from "./api";

export const loginUser = (credentials) => {
  return API.post("/auth/login", credentials);
};