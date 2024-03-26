import {combineReducers, configureStore} from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
    user: userReducer
})

const persistConfig = {
    key : 'root', 
    version : 1,
    storage ,
}

const persistedReducers = persistReducer(persistConfig , rootReducer)

const store = configureStore({
    reducer : persistedReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export default store
export const persistor = persistStore(store)