import { AsyncThunk, configureStore } from '@reduxjs/toolkit'
import potReducer from './reducers/potReducer'
import budgetReducer from './reducers/budgetReducer'
import transactionReducer from './reducers/transactionReducer'

const store = configureStore({
  reducer: {
    pots: potReducer,
    budgets: budgetReducer,
    transactions: transactionReducer,
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