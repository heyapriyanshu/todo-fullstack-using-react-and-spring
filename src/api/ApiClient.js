import axios from 'axios'

export const apiClient = axios.create(
    {//todolistbackend-production-d4f8.up.railway.app
        baseURL: 'https://todolistbackend-production-d4f8.up.railway.app'
    }
);