import {store} from "../store/configureStore" 
import { startSetCommands } from "./commands";
import { startSetDipenses } from "./dipenses";

const {dispatch} = store
export const login = (user) => ({
  type: 'LOGIN',
  user
});

export const LoggedIn=(user,callback)=>{
    dispatch(login(user));
    Promise.all([startSetDipenses(),startSetCommands()]).then(callback())
}

export const logout = () => ({
  type: 'LOGOUT'
});




