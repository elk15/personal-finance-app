import { FormEvent, useEffect, useState } from "react";
import { Transaction, TransactionCategory } from "../../types";
import FormPopup from "../FormPopup";
import SelectInput from "../SelectInput";
import TextInput from "../TextInput";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { createTransaction, setTransactionsError, updateTransaction } from "../../reducers/transactionReducer";
import { ErrorText, Label } from "../../styled-components";
import { DateTime } from "luxon";
import { useAuth } from "../../contexts/AuthContext";

interface TransactionFormProps {
    isAddNew: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    transaction?: Transaction;
}

const TransactionForm = ({isAddNew, setShowModal, transaction} : TransactionFormProps) => {
    const [name, setName] = useState<string>('')
    const [category, setCategory] = useState<TransactionCategory>(TransactionCategory.Entertainment)
    const [amount, setAmount] = useState<number>(0)
    const [date, setDate] = useState<string>(DateTime.now().toISO().split('T')[0])
    const [recurring, setRecurring] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const { loadingStatus, error } = useAppSelector((state) => state.transactions)
    const {user} = useAuth()

    useEffect(() => {
      if (transaction) {
        setName(transaction.name)
        setCategory(transaction.category)
        setAmount(transaction.amount)
        setDate(transaction.date.split('T')[0])
        setRecurring(transaction.recurring)
      }
    }, [transaction])

    const handleConfirm = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!user) return

      if (amount == 0) {
        const operationName = isAddNew ? 'createBudget' : 'updateBudget'
        dispatch(setTransactionsError({operationName, text: `Amount can't be zero.`}))
        return
      }

      if (isAddNew) {
        const newTransaction = {
          name, category, amount, date, recurring
        }
        dispatch(createTransaction({newTransaction})).then(() => {
          setShowModal(false)
        })

      } else {
        if (transaction?.id) {
          const updatedTransaction = {
            name, category, amount, date, recurring, id: transaction.id,
          }
          dispatch(updateTransaction({updatedTransaction})).then(() => {
            setShowModal(false)
          })
        }
      }
    }

    const title = isAddNew ? 'Add New Transaction' : 'Edit Transaction'
    const buttonText = isAddNew ? 'Add Transaction' : 'Save Changes'

  return (
    <FormPopup 
        title={title} 
        buttonText={buttonText} 
        handleConfirm={handleConfirm} 
        setShowModal={setShowModal}
        loading={isAddNew ? loadingStatus.createTransaction : loadingStatus.updateTransaction}
        subtitle={<ErrorText>{isAddNew ? error.createTransaction : error.updateTransaction}</ErrorText>}
        >
            <TextInput 
            label="Recipient/Sender" 
            placeholder=" "
            type="text" id="transaction-name"
            showCharactersLeft={true} 
            maxLength={30}
            value={name} setValue={e => setName( e.currentTarget.value)}/>
            <SelectInput 
            options={Object.values(TransactionCategory)}
            name="Transaction Category"
            value={category}
            setValue={(category) => setCategory(category as TransactionCategory)}
            />
            <TextInput 
            label="Amount" 
            hasDollar={true} 
            placeholder="e.g. -300"
            type="number" id="transaction-amount"
            min={-10000000}
            value={amount.toString()} setValue={e => setAmount( parseFloat(e.currentTarget.value))}/>
            <TextInput 
            label="Date" 
            placeholder=" "
            type="date" id="transaction-amount"
            value={date} setValue={e => setDate( e.currentTarget.value)}/>
            <div className="flex gap-3 mt-3 mb-3 items-center">
                <input 
                type="checkbox" 
                id="transaction-recurring"
                checked={recurring}
                onChange={e => setRecurring( e.target.checked)}
                className="w-7 h-7 relative checked:bg-green checked:border-green peer shrink-0 appearance-none rounded-lg border border-grey-300 cursor-pointer" 
                />
                <Label htmlFor="transaction-recurring">Is Recurring?</Label>
                <div className="peer-checked:block hidden absolute w-2 h-2 bg-white rounded-full left-[34px]"></div>
            </div>
    </FormPopup>
  )
}

export default TransactionForm;