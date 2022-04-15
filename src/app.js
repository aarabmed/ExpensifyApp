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






store.subscribe(() => {
  const { auth } = store.getState()
  if(auth.user!==null){
    if(history.location.pathname==='/'||history.location.pathname==='/login'){
      history.push('/dashboard')
    }
  }else{
    history.push('/login')
  }
});


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



