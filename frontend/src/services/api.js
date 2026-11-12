import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("minhaComunidadeToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export function mensagemErro(erro) {
  if (erro.response?.data?.erro) return erro.response.data.erro;
  if (erro.code === "ECONNABORTED") return "A API demorou para responder. Tente novamente.";
  if (!erro.response) return "Não foi possível conectar à API. Confira se ela está ligada.";
  return "Ocorreu um erro inesperado. Tente novamente.";
}

export default api;
