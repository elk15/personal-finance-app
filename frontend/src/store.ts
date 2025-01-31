import { AsyncThunk, configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import potReducer from './reducers/potReducer'

const store = configureStore({
  reducer: {
    user: userReducer,
    pots: potReducer,
  }
})
export default store

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']

export type GenericAsyncThunk = AsyncThunk<unknown, unknown, never>

export type PendingAction = ReturnType<GenericAsyncThunk['pending']>
export type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
export type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>