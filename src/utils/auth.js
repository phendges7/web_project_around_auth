import { handleResponse, handleError } from "./api";

const BASE_URL = "https://se-register-api.en.tripleten-services.com/v1";
const DEFAULT_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({ email, password }),
  })
    .then(handleResponse)
    .catch(handleError);
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({ email, password }),
  })
    .then(handleResponse)
    .catch(handleError);
};
