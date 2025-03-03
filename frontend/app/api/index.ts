import { createCookieSessionStorage } from '@remix-run/node';
import axios, { AxiosInstance } from 'axios';

export const BASE_URL = 'http://localhost:8000/api';

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