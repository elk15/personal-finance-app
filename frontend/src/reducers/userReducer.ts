import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from '../services/users'
import { Config, Credentials } from '../types'
import { NavigateFunction } from 'react-router-dom'
import { AxiosError } from 'axios'
import { isPendingAction, getOperationName, isFulfilledAction, isRejectedAction } from '../utils'
import { UserState } from './types'

const initialState: UserState = {
  type: 'users',
  userToken: null,
  email: '',
  balance: 0,
  loadingStatus: {
    login: 'idle',
    update: 'idle'
  },
  error: {
    login: null,
    update: null
  },
}

export const loginUser = createAsyncThunk(
  'user/login',
  async (
    { credentials, navigate } : {credentials: Credentials, navigate: NavigateFunction},
    {rejectWithValue, dispatch},
  ) => {
    try {
      const data = await userService.login(credentials)
      dispatch(setUser(data))
      window.localStorage.setItem('loggedFinanceUser', JSON.stringify({token: data.token, email: data.email}))
      navigate('/')
      return data

    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data?.error || 'An error occurred')
      }
      return rejectWithValue('An unexpected error occurred')
    }
  }
)

export const getBalance = createAsyncThunk(
  'user/getBalance',
  async ({obj, config}: {obj: {email: string, balance?: number}, config: Config }, 
    {rejectWithValue, dispatch}) => {
    try {
      const data = await userService.balance(obj, config)
      dispatch(setBalance(data))
      return data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data?.error || 'An error occurred')
      }
      return rejectWithValue('An unexpected error occurred')
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.email = ''
      state.userToken = null
      state.balance = 0
      state.loadingStatus.login = 'idle'
      state.loadingStatus.login = 'idle'
      state.error = {
        login: null,
        update: null
      }
      window.localStorage.removeItem('loggedFinanceUser')
    },
    clearErrors: (state) => {
      state.error = {
        login: null,
        update: null
      }
    },
    setUser: (state, action) => {
      state.email = action.payload.email
      state.userToken = action.payload.token
    },
    setBalance: (state, action) => {
      state.balance = action.payload.balance
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPendingAction, (state, action) => {
        const operationName = getOperationName(action.type)
        state.loadingStatus[operationName] = 'pending'
      })
      .addMatcher(isFulfilledAction, (state, action) => {
        const operationName = getOperationName(action.type)
        state.loadingStatus[operationName] = 'succeeded'
        state.error[operationName] = null
      })
      .addMatcher(isRejectedAction, (state, action) => {
        const operationName = getOperationName(action.type)
        state.loadingStatus[operationName] = 'failed'
        state.error[operationName] = action.payload as unknown as string
      })
  }
})

export const { logout, clearErrors, setUser, setBalance } = userSlice.actions
export default userSlice.reducer