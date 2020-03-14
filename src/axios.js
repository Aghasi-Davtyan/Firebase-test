import axios from 'axios';

let instance = axios.create({
    baseURL: 'https://mini-bank-8b52a.firebaseio.com/'
})

export default instance;