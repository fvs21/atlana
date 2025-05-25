import axios, { AxiosInstance } from 'axios';

export const BASE_URL = process.env.NODE_ENV === 'production' ? 'http://atlana-lb-651789820.us-east-2.elb.amazonaws.com/api' : 'http://localhost:8000/api';


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