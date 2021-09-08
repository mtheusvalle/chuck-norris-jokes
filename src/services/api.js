import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.icndb.com/jokes',
    timeout: '1000'
});

export default api;