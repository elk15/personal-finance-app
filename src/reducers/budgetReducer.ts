import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import budgetService from '../services/budgets'
import { Budget, BudgetSimplified } from '../types'
import { ItemState } from './types'
import { AxiosError } from 'axios'
import { isPendingAction, getOperationName, isFulfilledAction, isRejectedAction } from '../utils'
import { toast } from 'react-toastify'

const initialState : ItemState = {
    type: 'budgets',
    data: [] as Budget[],
    loadingStatus: {
        initializeBudgets: 'idle',
        createBudget: 'idle',
        updateBudget: 'idle',
        deleteBudget: 'idle'
    },
    error: {
        initializeBudgets: null,
        createBudget: null,
        updateBudget: null,
        deleteBudget: null
    },
}

export const initializeBudgets = createAsyncThunk(
    'budgets/initializeBudgets',
    async (
      {isGuest}: {isGuest: boolean},
      {rejectWithValue, dispatch},
    ) => {
      try {
        const budgets = await budgetService.getAll(isGuest)
        dispatch(setBudgets(budgets))
  
      } catch (error) {
        if (error instanceof AxiosError) {
            return rejectWithValue(error.response?.data?.error || 'An error occurred')
        }
        return rejectWithValue('An unexpected error occurred')
      }
    }
)

export const createBudget = createAsyncThunk(
    'budgets/createBudget',
    async (
      {newBudget} : {newBudget: BudgetSimplified},
      {rejectWithValue, dispatch},
    ) => {
      try {
        const budget = await budgetService.create(newBudget)
        dispatch(appendBudget(budget))
  
      } catch (error) {
        if (error instanceof AxiosError) {
            return rejectWithValue(error.response?.data?.error || 'An error occurred')
        }
        return rejectWithValue('An unexpected error occurred')
      }
    }
)

export const deleteBudget = createAsyncThunk(
    'budgets/deleteBudget',
    async (
      {id} : {id: string},
      {rejectWithValue, dispatch},
    ) => {
      try {
        if (id.startsWith('mock-')) {
          toast.info('Sample data is read-only. Create your own data to delete it!');
          return true;
        }

        dispatch(removeBudget(id))
        await budgetService.remove(id)
  
      } catch (error) {
        if (error instanceof AxiosError) {
          return rejectWithValue(error.response?.data?.error || 'An error occurred')
        }
        return rejectWithValue('An unexpected error occurred')
      }
    }
)

export const updateBudget = createAsyncThunk(
    'budgets/updateBudget',
    async (
      {updatedBudget} : {updatedBudget: Budget},
      {rejectWithValue, dispatch},
    ) => {
      try {
        if (updatedBudget.id.startsWith('mock-')) {
          toast.info('Cannot update sample data. Create your own data to make changes!');
          return;
        }
        
        dispatch(editBudget(updatedBudget))
        await budgetService.update(updatedBudget.id, updatedBudget)
  
      } catch (error) {
        if (error instanceof AxiosError) {
          return rejectWithValue(error.response?.data?.error || 'An error occurred')
        }
        return rejectWithValue('An unexpected error occurred')
      }
    }
)

const budgetSlice = createSlice({
    name: 'budgets',
    initialState,
    reducers: {
        appendBudget(state, action: PayloadAction<Budget>) {    
          if (state.type === 'budgets') { 
            state.data.unshift(action.payload);
          }  
        },
        setBudgets(state, action: PayloadAction<Budget[]>) {
          if (state.type === 'budgets') {
            state.data = action.payload;
          }
        },
        removeBudget(state, action: PayloadAction<string>) {
          if (state.type === 'budgets') {
            state.data = state.data.filter(i => i.id !== action.payload);
          } 
        },
        editBudget(state, action: PayloadAction<Budget>) {
          if (state.type === 'budgets') {
            state.data = state.data.map(i => 
                i.id === action.payload.id ? action.payload : i
            );
          } 
        },
        setBudgetsError(state, action: PayloadAction<{operationName: string, text: string}>) {
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

export const { appendBudget, setBudgets, removeBudget, editBudget, setBudgetsError} = budgetSlice.actions

export default budgetSlice.reducer