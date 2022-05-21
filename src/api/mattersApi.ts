import { AxiosRequestConfig } from 'axios'
import { Api } from './index'

export const mattersApi = {
    list(params?:AxiosRequestConfig<any>){
        return Api.get('/discipline/all', params)
    },
}