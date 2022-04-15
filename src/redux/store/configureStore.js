import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { persistStore, persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import storage from "redux-persist/lib/storage";

import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import authReducer from '../reducers/auth';
import dipenseReducer from '../reducers/dipenses'
import dipenseFilter from '../reducers/filters'
import commandReducer from '../reducers/commands'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  dipenses:dipenseReducer,
  commandes:commandReducer,
  filters:dipenseFilter
})

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ["auth","dipenses","commands"],
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    pReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export const initializeStore = (initialState = {}) => {
  return createdStore;
};

export const persistor = persistStore(store);

