import axios from 'axios'
export const Api = axios.create({
    // baseURL:process.env.PROJECT_URL_REQUESTS
    baseURL:"https://api-prof.herokuapp.com/api"
})