export enum Theme {
  Green = 'green',
  Yellow = 'yellow',
  Cyan = 'cyan',
  Navy = 'navy',
  Red = 'red',
  Purple = 'purple',
  Pink = 'pink',
  Turquoise = 'turquoise',
  Brown = 'brown',
  Magenta = 'magenta',
  Blue = 'blue',
  NavyGrey = 'navy-grey',
  ArmyGreen = 'army-green',
  Gold = 'gold',
  Orange = 'orange',
}

export enum TransactionCategory {
  Entertainment = 'Entertainment',
  Bills = 'Bills',
  Groceries = 'Groceries',
  DiningOut = 'Dining Out',
  Transportation = 'Transportation',
  PersonalCare = 'Personal Care',
  Education = 'Education',
  Lifestyle = 'Lifestyle',
  Shopping = 'Shopping',
  General = 'General',
}

export enum AllTransactions {
  AllTransactions = 'All transactions'
}

export type CategoryDropdownOption = TransactionCategory | AllTransactions

export interface Credentials {
  email: string
  password: string
}

export type LoadingState = 'idle' | 'pending' | 'succeeded' | 'failed'

export enum SortBy {
  Latest = 'Latest',
  Oldest = 'Oldest',
  AtoZ = 'A to Z',
  ZtoA = 'Z to A',
  Highest = 'Highest',
  Lowest = 'Lowest'
}

export interface UpdatedUserData {
  email: string
  balance?: number
}

export interface Pot {
  id: string;
  name: string;
  user_id?: string;
  target: number;
  theme: Theme;
  total_saved: number;
  created_at?: string;
  updated_at?: string;
}

export interface Budget {
  id: string;
  user_id?: string;
  category: TransactionCategory;
  max_amount: number;
  theme: Theme;
  created_at?: string;
  updated_at?: string;
}

export interface Transaction {
  id: string;
  user_id?: string;
  category: TransactionCategory;
  name: string;
  date: string;
  amount: number;
  recurring: boolean;
  created_at?: string;
  updated_at?: string;
}

export type BudgetSimplified = Omit<Budget, 'id' | 'user_id' | 'created_at' | 'updated_at'>
export type PotSimplified = Omit<Pot, 'id' | 'user_id' | 'created_at' | 'updated_at'>
export type TransactionSimplified = Omit<Transaction, 'id' | 'user_id' | 'created_at' | 'updated_at'>
