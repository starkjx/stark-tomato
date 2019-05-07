import axios from 'axios';
import history from './history';

const appID = "yVBJrBw1HFdFq2tPdTXPgcoL"
const appSecret = "Vkh92EDv8eQQFqChaZ5Wt7vA"

const instance = axios.create({
  baseURL: 'https://gp-server.hunger-valley.com/',
  headers: {
    't-app-id': appID,
    't-app-secret': appSecret
  }
});

// Add a request interceptor
instance.interceptors.request.use( (config)=> {
  const xToken = localStorage.getItem('x-token')
  if(xToken){
    config.headers['Authorization'] = `Bearer ${xToken}`
  }
  return config;
}, (error)=> {
  console.error(error)
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use( (response)=> {
  // Do something with response data
  if(response.headers['x-token']){
    localStorage.setItem('x-token',response.headers['x-token'])
  }
  return response;
}, (error)=> {
  if(error.response.status === 401){
    // console.log('401')
    // window.location.href = '/login'
    history.push('/login');
  }
  // Do something with response error
  return Promise.reject(error);
});

export default instance