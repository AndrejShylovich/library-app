import {configureStore} from '@reduxjs/toolkit'
import authenticaionReducer from './slices/AuthenticationSlice'
import modalReducer from './slices/ModalSlice'
import bookReducer from './slices/BookSlice'

export const store = configureStore({
    reducer:{
       authentication: authenticaionReducer,
       modal: modalReducer,
       book: bookReducer
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;