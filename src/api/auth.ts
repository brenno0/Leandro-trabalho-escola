import { AuthApi as Api } from './index';

export const authApi = {
    post(body?:Object){
        return Api.post('/auth/signin', body)
    }
}
