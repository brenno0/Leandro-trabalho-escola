import { AxiosRequestConfig } from 'axios';
import { AuthApi } from './index';

export const dashboardApi = {
    list(params?:AxiosRequestConfig<any>){
       return AuthApi.get('/panel/all', params)
    },
    approve(id:Number){
        return AuthApi.put(`/panel/approve/${id}`)
    },
    disapprove(id:Number){
        return AuthApi.put(`/panel/disapprove/${id}`)
    }
}