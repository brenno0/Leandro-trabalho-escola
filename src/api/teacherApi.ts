import { AxiosRequestConfig } from 'axios';
import { Api } from './index';

export const teacherApi = {
    list(params?:AxiosRequestConfig<any>){
       return Api.get('/teacher/all', params)
    },
    post(body?:Object){
        return Api.post('/teacher/save', body)
    }
}