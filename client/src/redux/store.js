import {configureStore} from '@reduxjs//toolkit';
import userReducers from './features/user'

export const store=configureStore({
    reducer:{
        users:userReducers
    },
})

export default store;