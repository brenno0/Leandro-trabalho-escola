import { AxiosRequestConfig } from 'axios';
import { Api } from './index';

export const dashboardApi = {
    list(params?:AxiosRequestConfig<any>){
       return Api.get('/panel/all', params)
    },
    approve(id:Number){
        return Api.put(`/panel/approve/${id}`)
    },
    disapprove(id:Number){
        return Api.put(`/panel/disapprove/${id}`)
    }
}