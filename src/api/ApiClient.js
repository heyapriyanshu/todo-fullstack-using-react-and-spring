import axios from 'axios'

export const apiClient = axios.create(
    {//todolistbackend-production-d4f8.up.railway.app
        // baseURL: 'http://priyanshuranjan.live:8080'
        baseURL: 'http://localhost:8080'
    }
);