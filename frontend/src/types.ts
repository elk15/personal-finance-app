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

export interface Config {
  headers: {Authorization: string}
}

export interface Credentials {
  email: string
  password: string
}

export type LoadingState = 'idle' | 'pending' | 'succeeded' | 'failed'

export interface UserData {
  token?: string
  email: string
  name: string
  balance: number
}

export interface Pot {
  id: string;
  name: string;
  target: number;
  theme: Theme;
  totalSaved: number;
}

export type PotWithoutId = Omit<Pot, 'id'>

export interface Budget {
  id: string;
  category: TransactionCategory;
  maxAmount: number;
  theme: Theme;
}

export type BudgetWithoutId = Omit<Budget, 'id'>

export interface Transaction {
  id: string;
  category: TransactionCategory;
  name: string;
  date: string;
  amount: number;
  recurring: boolean;
}

export type TransactionWithoutId = Omit<Transaction, 'id'>