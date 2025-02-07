import { UnknownAction } from "@reduxjs/toolkit"
import { FulfilledAction, PendingAction, RejectedAction } from "./store"
import { DateTime } from 'luxon';
import { SortBy, Transaction } from "./types";

export const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1)

export const getAuthHeader = (token: string) => {
    return {
        headers: { Authorization: `Bearer ${token}` }
    }
}

export const isPendingAction = (action: UnknownAction): action is PendingAction => action.type.endsWith('/pending')
export const isRejectedAction = (action: UnknownAction): action is RejectedAction => action.type.endsWith('/rejected')
export const isFulfilledAction = (action: UnknownAction): action is FulfilledAction => action.type.endsWith('/fulfilled')

// Get operation name from action type (e.g., "login" from "user/login/pending")
export const getOperationName = (actionType: string) => {
  const parts = actionType.split('/')
  return parts[1]
}

export const sortTransactions = (transactions: Transaction[]) => {
  return transactions.sort((a, b) => {
    const firstDate = DateTime.fromISO(a.date)
    const secondDate = DateTime.fromISO(b.date)
    return secondDate.valueOf() - firstDate.valueOf()
  })
}

export const formatDate = (stringDate: string) => DateTime.fromISO(stringDate).toFormat('dd LLL yyyy')

export const getOrdinalSuffix = (number: number) => {
  const num = Math.abs(number);
  
  if (num % 100 >= 11 && num % 100 <= 13) {
      return `${num}th`;
  }
  
  switch (num % 10) {
      case 1:
          return `${num}st`;
      case 2:
          return `${num}nd`;
      case 3:
          return `${num}rd`;
      default:
          return `${num}th`;
  }
}

export const getSortByFunction = (sortBy: SortBy, isBills: boolean = false) => {
  return ((a: Transaction, b: Transaction) => {
    let result
    const firstDate = DateTime.fromISO(a.date)
    const secondDate = DateTime.fromISO(b.date)

    switch(sortBy) {
        case SortBy.Oldest:
            result = isBills 
              ? firstDate.get('day') - secondDate.get('day')
              : firstDate.valueOf() - secondDate.valueOf()
            break
        case SortBy.Latest:
            result =  isBills
              ? secondDate.get('day') - firstDate.get('day')
              : secondDate.valueOf() - firstDate.valueOf()
            break
        case SortBy.AtoZ:
            result = a.name.localeCompare(b.name)
            break
        case SortBy.ZtoA:
            result = b.name.localeCompare(a.name)
            break
        case SortBy.Highest:
            result = Math.abs(b.amount) - Math.abs(a.amount) 
            break
        case SortBy.Lowest:
            result = Math.abs(a.amount) - Math.abs(b.amount)
            break
    }
    return result;
  })
}

export const getFilterByQueryFunction = (query: string) => {
  return (
    (bill: Transaction) => {
      if (query.length > 1) {
          return bill.name.toLowerCase().includes(query.toLocaleLowerCase())
      }
      return true
    }
  )
}

export const getBaseUrl = () => {
  if (import.meta.env.MODE === 'development') {
    return import.meta.env.VITE_DEV_SERVER_URL
  } else {
    return import.meta.env.VITE_SERVER_URL
  }
}