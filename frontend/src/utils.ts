import { UnknownAction } from "@reduxjs/toolkit"
import { FulfilledAction, PendingAction, RejectedAction } from "./store"
import { DateTime } from 'luxon';
import { Transaction } from "./types";

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