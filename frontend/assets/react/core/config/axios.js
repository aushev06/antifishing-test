import axios from 'axios';

axios.defaults.baseURL = 'http://admin.antifishing.loc/';
axios.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;



export default axios;