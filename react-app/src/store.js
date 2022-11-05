import { configureStore } from '@reduxjs/toolkit'
import walletReducer from './walletSlice'
import { combineReducers } from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  setter: walletReducer,
})

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig,reducers);

export default configureStore({
  reducer: persistedReducer,
  middleware:[thunk]
});
