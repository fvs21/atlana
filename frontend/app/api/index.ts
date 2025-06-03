import axios, { AxiosInstance } from 'axios';

export const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://atlana.mx/api' : 'http://localhost:8000/api';
export const WS_URL = process.env.NODE_ENV === 'production' ? 'wss://atlana.mx/api/ws' : 'ws://localhost:8000/api/ws';

export const api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
});

export const apiGuest: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true
});

export const apiMultiPart: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
    },
    withCredentials: true
});