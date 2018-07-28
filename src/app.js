import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import 'normalize.css/normalize.css';
import {startSetDipenses, addDipense} from './actions/dipenses'
import {startSetCommands} from './actions/commands'
import {addCommand} from './actions/commands'



import 'antd/dist/antd.css'; 
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';


const store = configureStore();
const jsx=(
  <Provider store={store}>
      <AppRouter/>
  </Provider>
);
store.subscribe(() => {
  console.log('store:',store.getState());
});



let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
      store.dispatch(login(user.uid));
      store.dispatch(startSetDipenses()).then(()=>{
      store.dispatch(startSetCommands());
      renderApp();
      history.push('/dashboard');

      if (history.location.pathname === '/') {
        history.push('/dashboard');
      } 
    })
    renderApp();
      history.push('/dashboard');
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});
