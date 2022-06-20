import { AxiosRequestConfig } from 'axios';
import { Api } from './index';

export const teacherApi = {
    list(params?:AxiosRequestConfig<any>){
       return Api.get('/teacher/all', params)
    },
    post(body?:Object){
        return Api.post('/teacher/save', body)
    },
    stars(id:Number, stars:Number){
        return Api.put(`/teacher/${stars}/${id}`, )
    },
    verify(id:Number){
        return Api.put(`/teacher/verified/${id}`)
    },
    unVerify(id:Number){
        return Api.put(`/teacher/notverified/${id}`)
    },
}