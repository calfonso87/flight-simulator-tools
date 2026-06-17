import axios, { AxiosInstance } from "axios";

const BASE_URL =
  process.env["EXPO_PUBLIC_API_BASE_URL"] ?? "https://api.flightsimtools.dev/v1";

function createApiClient(): AxiosInstance {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10_000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  instance.interceptors.request.use((config) => {
    // Attach auth token here once auth is implemented:
    // const token = getAuthToken();
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Normalize network/API errors before they reach the application layer
      return Promise.reject(error);
    }
  );

  return instance;
}

export const apiClient = createApiClient();
