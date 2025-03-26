import { handleResponse } from "./api";

const BASE_URL = "https://se-register-api.en.tripleten-services.com/v1";
const DEFAULT_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

// FUNCTION - REGISTRA USUARIO
export const register = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(email, password),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao registrar");
    }

    const data = await response.json();
    console.log("Registro bem-sucedido:", data);
    return data;
  } catch (error) {
    console.error("Erro detalhado:", {
      endpoint: "/signup",
      error: error.message,
    });
    throw error;
  }
};

// FUNCTION - AUTORIZA USUARIO - LOGIN
export const authorize = (email, password) => {
  const payload = { email, password };
  console.log("Payload sendo enviado:", payload); // Debug crucial

  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((res) => {
    console.log("Resposta da API:", res); // Debug da resposta
    return handleResponse(res);
  });
};

// FUNCTION - VALIDA TOKEN
export const validateToken = async (token) => {
  const response = await fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};
