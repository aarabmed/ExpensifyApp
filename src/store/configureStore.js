import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import dipenseReducer from '../reducers/dipenses'
import dipenseFilter from '../reducers/filters'
import commandReducer from '../reducers/commands'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      dipenses:dipenseReducer,
      commands:commandReducer,
      filters:dipenseFilter
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
