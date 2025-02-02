import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import transactionService from '../services/transactions'
import { Config, Transaction, TransactionWithoutId } from '../types'
import { ItemState } from './types'
import { AxiosError } from 'axios'
import { isPendingAction, getOperationName, isFulfilledAction, isRejectedAction } from '../utils'

const initialState : ItemState = {
    type: 'transactions',
    data: [] as Transaction[],
    loadingStatus: {
        initializeTransactions: 'idle',
        createTransaction: 'idle',
        updateTransaction: 'idle',
        deleteTransaction: 'idle'
    },
    error: {
        initializeTransactions: null,
        createTransaction: null,
        updateTransaction: null,
        deleteTransaction: null
    },
}

export const initializeTransactions = createAsyncThunk(
    'transactions/initializeTransactions',
    async (
      config: Config,
      {rejectWithValue, dispatch},
    ) => {
      try {
        const transactions = await transactionService.getAll(config)
        dispatch(setTransactions(transactions))
  
      } catch (error) {
        if (error instanceof AxiosError) {
            return rejectWithValue(error.response?.data?.error || 'An error occurred')
        }
        return rejectWithValue('An unexpected error occurred')
      }
    }
)

export const createTransaction = createAsyncThunk(
    'transactions/createTransaction',
    async (
      {newTransaction, config} : {newTransaction: TransactionWithoutId, config: Config},
      {rejectWithValue, dispatch},
    ) => {
      try {
        const transaction = await transactionService.create(newTransaction, config)
        dispatch(appendTransaction(transaction))
  
      } catch (error) {
        if (error instanceof AxiosError) {
            return rejectWithValue(error.response?.data?.error || 'An error occurred')
        }
        return rejectWithValue('An unexpected error occurred')
      }
    }
)

export const deleteTransaction = createAsyncThunk(
    'transactions/deleteTransaction',
    async (
      {id, config} : {id: string, config: Config},
      {rejectWithValue, dispatch},
    ) => {
      try {
        dispatch(removeTransaction(id))
        await transactionService.remove(id, config)
  
      } catch (error) {
        if (error instanceof AxiosError) {
            return rejectWithValue(error.response?.data?.error || 'An error occurred')
        }
        return rejectWithValue('An unexpected error occurred')
      }
    }
)

export const updateTransaction = createAsyncThunk(
    'transactions/updateTransaction',
    async (
      {updatedTransaction, config} : {updatedTransaction: Transaction, config: Config},
      {rejectWithValue, dispatch},
    ) => {
      try {
        dispatch(editTransaction(updatedTransaction))
        await transactionService.update(updatedTransaction.id, updatedTransaction, config)
  
      } catch (error) {
        if (error instanceof AxiosError) {
            return rejectWithValue(error.response?.data?.error || 'An error occurred')
        }
        return rejectWithValue('An unexpected error occurred')
      }
    }
)

const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        appendTransaction(state, action: PayloadAction<Transaction>) {    
          if (state.type === 'transactions') { 
            state.data.unshift(action.payload);
          }  
        },
        setTransactions(state, action: PayloadAction<Transaction[]>) {
          if (state.type === 'transactions') {
            state.data = action.payload;
          }
        },
        removeTransaction(state, action: PayloadAction<string>) {
          if (state.type === 'transactions') {
            state.data = state.data.filter(i => i.id !== action.payload);
          } 
        },
        editTransaction(state, action: PayloadAction<Transaction>) {
          if (state.type === 'transactions') {
            state.data = state.data.map(i => 
                i.id === action.payload.id ? action.payload : i
            );
          } 
        },
        setTransactionsError(state, action: PayloadAction<{operationName: string, text: string}>) {
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

export const { appendTransaction, setTransactions, removeTransaction, editTransaction, setTransactionsError} = transactionSlice.actions

export default transactionSlice.reducer