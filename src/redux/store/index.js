import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import rootReducer from '../reducers';

const middleware = [thunk];

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'auth']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistedReducer,

  composeWithDevTools(applyMiddleware(...middleware))
);

const persistor = persistStore(store);
export { persistor, store };
