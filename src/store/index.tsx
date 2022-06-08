import { action, Action, createStore, createTypedHooks } from "easy-peasy";

interface User {
    accessToken: string | null;
    email:string | null;
    id: number | null; 
    roles: string[] | null;
    username: string | null;
}

interface UserModel {
    users:User;
    addUser:Action<UserModel, User>
}

const typedHooks = createTypedHooks<UserModel>();
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

export const store = createStore<UserModel>({
    users: {
      accessToken: "",
      email: "",
      id: null,
      roles: [],
      username: "",
    },
    addUser: action((state, payload) => {
      state.users = payload;
    }),
    
  });
  
