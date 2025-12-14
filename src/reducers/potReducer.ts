import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import potService from '../services/pots'
import { Pot, PotSimplified } from '../types'
import { ItemState } from './types'
import { AxiosError } from 'axios'
import { isPendingAction, getOperationName, isFulfilledAction, isRejectedAction } from '../utils'
import { toast } from 'react-toastify'

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
      {isGuest}: {isGuest: boolean},
      {rejectWithValue, dispatch},
    ) => {
      try {
        const pots = await potService.getAll(isGuest)
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
      {newPot} : {newPot: PotSimplified},
      {rejectWithValue, dispatch},
    ) => {
      try {
        const pot = await potService.create(newPot)
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
      {id} : {id: string},
      {rejectWithValue, dispatch},
    ) => {
      try {
        if (id.startsWith('mock-')) {
          toast.info('Sample data is read-only. Create your own data to delete it!');
          return true;
        }

        dispatch(removePot(id))
        await potService.remove(id)
  
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
      {updatedPot} : {updatedPot: Pot},
      {rejectWithValue, dispatch},
    ) => {
      try {
        if (updatedPot.id.startsWith('mock-')) {
          toast.info('Cannot update sample data. Create your own data to make changes!');
          return;
        }

        dispatch(editPot(updatedPot))
        await potService.update(updatedPot.id, updatedPot)
  
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