import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';

const rootReducer = combineReducers({
    auth: authSlice,

});

const store = configureStore({
    reducer: rootReducer, 
});

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
