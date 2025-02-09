import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import potService from '../services/pots'
import { Config, Pot, PotWithoutId } from '../types'
import { ItemState } from './types'
import { AxiosError } from 'axios'
import { isPendingAction, getOperationName, isFulfilledAction, isRejectedAction } from '../utils'

const initialState : ItemState = {
    type: 'pots',
    data: [] as Pot[],
    loadingStatus: {
        initializePots: 'idle',
        createPot: 'idle',
        updatePot: 'idle',
        deletePot: 'idle'
    },
    error: {
        initializePots: null,
        createPot: null,
        updatePot: null,
        deletePot: null
    },
}

export const initializePots = createAsyncThunk(
    'pots/initializePots',
    async (
      config: Config,
      {rejectWithValue, dispatch},
    ) => {
      try {
        const pots = await potService.getAll(config)
        dispatch(setPots(pots))
  
      } catch (error) {
        if (error instanceof AxiosError) {
            return rejectWithValue(error.response?.data?.error || 'An error occurred')
        }
        return rejectWithValue('An unexpected error occurred')
      }
    }
)

export const createPot = createAsyncThunk(
    'pots/createPot',
    async (
      {newPot, config} : {newPot: PotWithoutId, config: Config},
      {rejectWithValue, dispatch},
    ) => {
      try {
        const pot = await potService.create(newPot, config)
        dispatch(appendPot(pot))
  
      } catch (error) {
        if (error instanceof AxiosError) {
            return rejectWithValue(error.response?.data?.error || 'An error occurred')
        }
        return rejectWithValue('An unexpected error occurred')
      }
    }
)

export const deletePot = createAsyncThunk(
    'pots/deletePot',
    async (
      {id, config} : {id: string, config: Config},
      {rejectWithValue, dispatch},
    ) => {
      try {
        dispatch(removePot(id))
        await potService.remove(id, config)
  
      } catch (error) {
        if (error instanceof AxiosError) {
            return rejectWithValue(error.response?.data?.error || 'An error occurred')
        }
        return rejectWithValue('An unexpected error occurred')
      }
    }
)

export const updatePot = createAsyncThunk(
    'pots/updatePot',
    async (
      {updatedPot, config} : {updatedPot: Pot, config: Config},
      {rejectWithValue, dispatch},
    ) => {
      try {
        dispatch(editPot(updatedPot))
        await potService.update(updatedPot.id, updatedPot, config)
  
      } catch (error) {
        if (error instanceof AxiosError) {
            return rejectWithValue(error.response?.data?.error || 'An error occurred')
        }
        return rejectWithValue('An unexpected error occurred')
      }
    }
)

const potSlice = createSlice({
    name: 'pots',
    initialState,
    reducers: {
        appendPot(state, action: PayloadAction<Pot>) {    
          if (state.type === 'pots') { 
            state.data.unshift(action.payload);
          }  
        },
        setPots(state, action: PayloadAction<Pot[]>) {
          if (state.type === 'pots') {
            state.data = action.payload;
          }
        },
        removePot(state, action: PayloadAction<string>) {
          if (state.type === 'pots') {
            state.data = state.data.filter(i => i.id !== action.payload);
          } 
        },
        editPot(state, action: PayloadAction<Pot>) {
          if (state.type === 'pots') {
            state.data = state.data.map(i => 
                i.id === action.payload.id ? action.payload : i
            );
          } 
        },
        setPotsError(state, action: PayloadAction<{operationName: string, text: string}>) {
          state.error[action.payload.operationName] = action.payload.text
        },
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

export const { appendPot, setPots, removePot, editPot, setPotsError} = potSlice.actions

export default potSlice.reducer