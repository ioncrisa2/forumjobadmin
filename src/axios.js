import axios from 'axios';
import router from './router';
import store from './store';

const Api = axios.create({
    baseURL: 'https://forumandjobserver.info/api',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
});

// https://forumandjobserver.info/api

Api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${store.getters['auth/getToken']}`;
    return config;
});

Api.interceptors.response.use( response => {
    return response;
},error => {
    if(error.response.status === 401){
        localStorage.removeItem('token');
        router.push({name:'login'});
    }else if(error.response.status === 404){
        router.push({name:'notfound'});
    }

    throw error;
});

export default Api;
