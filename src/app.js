import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppRouter, { history }  from './routers/AppRouter';
import {store,persistor} from './redux/store/configureStore';
import { PersistGate } from "redux-persist/lib/integration/react";
import { logout } from './redux/actions/auth';
import {startSetDipenses, addDipense} from './redux/actions/dipenses'
import {startSetCommands} from './redux/actions/commands'
import withReduxStore from './commun/withReduxStore';
import Firebase  from './firebase';


import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';
import './styles/styles.scss';

import LoadingPage from './components/LoadingPage';



const firebase = new Firebase()
/* firebase.auth.onAuthStateChanged((user) => {
  if (user) {
        store.dispatch(startSetDipenses()).then(()=>{
          store.dispatch(startSetCommands());
                
          if (history.location.pathname === '/login') {
            return history.push('/dashboard');
          } 

           return history.push('/dashboard');
        })
     
    } else {
      firebase.doSignOut().then(res=>{
        store.dispatch(logout())
        history.push('/login');
      });
    }
});  */
const MOUNT_NODE = document.getElementById('app');

const App =(ReactDOM.render(
  <Provider store={store}>  
      <PersistGate loading={null} persistor={persistor}>
        <AppRouter/>
      </PersistGate>
  </Provider>
  ,MOUNT_NODE)
)

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(
     ['./routers/AppRouter'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    App;
    } 
  );
}



export default withReduxStore(App);



