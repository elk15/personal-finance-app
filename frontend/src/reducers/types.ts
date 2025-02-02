import { LoadingState, Pot, Budget, UserData, Transaction } from "../types";

interface BaseState {
    loadingStatus: {
      [key: string]: LoadingState
    }
    error: {
      [key: string]: string | null
    }
  }
  
  export interface PotState extends BaseState {
    type: 'pots';
    data: Pot[]
  }
  
  export interface BudgetState extends BaseState {
    type: 'budgets';
    data: Budget[]
  }

  export interface TransactionState extends BaseState {
    type: 'transactions';
    data: Transaction[]
  }

  export interface UserState extends BaseState{
    type: 'users';
    userInfo: UserData | null
    userToken: string | null
    balance: number
  }
  
  export type ItemState = PotState | BudgetState | UserState | TransactionState;