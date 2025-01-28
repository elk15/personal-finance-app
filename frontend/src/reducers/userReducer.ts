 
import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'
import { Credentials } from '../types'
import { AppDispatch } from '../store'
import { AxiosError } from 'axios'
import { NavigateFunction } from 'react-router-dom'

const initialState = {
  loading: false,
  userInfo: {}, // for user object
  userToken:  null, // for storing the JWT
  balance: 0,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
        return {
            ...state,
            userInfo: action.payload,
            userToken: action.payload.token,
            balance: action.payload.balance,
            error: null,
        }
    },
    setError(state, action) {
      return {
        ...state,
        error: action.payload.error
      }
    }
  },
})

export const { setUser, setError } = userSlice.actions

export const loginUser = (credentials: Credentials, navigate: NavigateFunction) => {
  return async (dispatch: AppDispatch) => {
    try {
      const data = await userService.login(credentials)
      window.localStorage.setItem(
        'loggedFinanceUser', JSON.stringify(data)
      )
      dispatch(setUser(data))
      navigate('/')
      
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data
        dispatch(setError(errorMessage))
      } else {
        dispatch(setError('An unexpected error occurred'))
      }
    }

  }
}


export default userSlice.reducer