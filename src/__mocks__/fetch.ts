import axios from "axios";

export const BASE_URL = "https://api-prof.herokuapp.com/api";

export const testsRequestDataGet = async (url:string, params?:any, status = 500) => {
  try {
    return await axios.get(`${BASE_URL}/${url}`);
  } catch (e) {
    return {
        response: [],
        status:status,
    };
  }
};

export const testsRequestDataPost = async (url:string, body?:{}, status = 500) => {
    try {
      return await axios.post(`${BASE_URL}/${url}`, body);
    } catch (e) {
      return {
        response:[],
        status:status
      };
    }
  };