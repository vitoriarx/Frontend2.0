// lib/api.ts
import axios from "axios";

export function createApiClient() {
  const api = axios.create({
    baseURL: "http://localhost:8000",
  });

  return api;
}
