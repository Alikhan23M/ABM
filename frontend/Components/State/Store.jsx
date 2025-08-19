// store.js
import { configureStore } from '@reduxjs/toolkit';
import emailReducer from './Reducers/emailSlice';
import lastUpdateReducers from './Reducers/lastUpdateReducers';
import tokenReducer from './Reducers/tokenSlice';
import nameReducer from './Reducers/nameSlice';
import googleReducer from './Reducers/googleSlice';
import roleReducer from './Reducers/roleSlice';
import userIdReducer from './Reducers/userIdSlice';

const Store = configureStore({
  reducer: {
    email: emailReducer,
    lastUpdate: lastUpdateReducers,
    token:tokenReducer,
    name:nameReducer,
    role:roleReducer,
    google: googleReducer,
    userId: userIdReducer,
  },
});

export default Store;
