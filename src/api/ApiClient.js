import axios from 'axios'

export const apiClient = axios.create(
    {//todolistbackend-production-d4f8.up.railway.app
        baseURL: 'http://3.108.40.166:8080'
        // baseURL: 'http://localhost:8080'
    }
);