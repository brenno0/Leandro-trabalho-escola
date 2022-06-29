import axios from 'axios'
import { Action, Actions } from 'easy-peasy';
interface User {
    accessToken: string | null;
    email:string | null;
    id: number | null; 
    roles: string[] | [];
    username: string | null;
}
interface UserModel {
    addUser:Action<UserModel, User>
}
export const Api = axios.create({
  // baseURL:process.env.PROJECT_URL_REQUESTS
  baseURL:"https://api-prof.herokuapp.com/api",
})
const token = localStorage.getItem('accessToken')
Api.defaults.headers.common['Authorization'] = `Bearer ${token}`


  

export const axiosInterceptor = (store:Actions<UserModel>, onError:() => void) => {
    //Executa as funções antes de entregar a resposta
    // Mais sobre interceptors: https://axios-http.com/docs/interceptors
    Api.interceptors.response.use(
      function (response) {
        
        return response;
      },
       function (error) {
        // Faz algo caso seja um erro
        
        // 401 é unauthorized
        // caso seja manda pra página de login
        if (error?.response?.status === 401) {
          onError();
          store.addUser({
            id:null,
            username:null,
            accessToken:null,
            roles:[],
            email:null
          });
        }
        return Promise.reject(error);
      }
    );
  };
  





