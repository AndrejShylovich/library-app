import {configureStore} from '@reduxjs/toolkit'
import authentificaionReducer from './slices/AuthentificationSlice'
import modalReducer from './slices/ModalSlice'
import bookReducer from './slices/BookSlice'

export const store = configureStore({
    reducer:{
       authentification: authentificaionReducer,
       modal: modalReducer,
       book: bookReducer
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;