import { configureStore } from '@reduxjs/toolkit'
import walletReducer from './walletSlice'


export default configureStore({
  reducer: {
    setter: walletReducer
  },
});

