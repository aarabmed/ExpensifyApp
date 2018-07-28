import { firebase } from '../firebase/firebase';
import { history } from '../routers/AppRouter';
export const login = (uid) => ({
  type: 'LOGIN',
  uid
});

export const startLogin = (login,password) => {
  return () => {
    return firebase.auth().signInWithEmailAndPassword(login,password).then(
      ()=>history.push('/dashboard')
    ).catch(function(error){
      if(error != null)
      return;
    })
  };
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};


