import axios from 'axios';

const api = axios.create({
    baseURL: 'http://api.icndb.com/jokes',
    timeout: '1000'
});

export default api;