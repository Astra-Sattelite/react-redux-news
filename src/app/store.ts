import { createSlice, configureStore, combineReducers } from '@reduxjs/toolkit'
import { newsSlice } from "../features/newsSlice"
import { usersSlice } from '../features/usersSlice'
import { reducer as formReducer } from 'redux-form'

export const store = configureStore({
  reducer: {
    news: newsSlice.reducer,
    users: usersSlice.reducer,
    loginForm: formReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch