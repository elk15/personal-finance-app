import { formatDate } from "../../utils"
import { Transaction } from "../../types"
import ModifyItemButton from "../ModifyItemButton"
import { FormEvent, useState } from "react"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { deleteTransaction } from "../../reducers/transactionReducer"
import TransactionForm from "./TransactionForm"
import DeleteConfirmation from "../DeleteConfirmation"
import useScreenWidth from "../hooks/useScreenWidth"
import { useAuth } from "../../contexts/AuthContext"

const TransactionItem = ({ name, category, amount, date, id, recurring } : Transaction) => {
    const [showEditModal, setShowEditModal] = useState<boolean>(false)
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
    const {user}  = useAuth()
    const { loadingStatus, error } = useAppSelector((state) => state.transactions)
    const dispatch = useAppDispatch()
    const screenWidth = useScreenWidth()    

    const handleDelete = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!user) return
            dispatch(deleteTransaction({id})).then(() => {
                setShowDeleteModal(false)
            })
    }

    const transaction = {
        name, category, amount, date, id, recurring
    }

  return (
    <div className="border-t flex p-2 gap-6 py-5 justify-between sm:justify-normal">
        {screenWidth > 640 ? 
            <>
            <div className="flex-1 max-w-[420px] font-bold flex gap-3 items-center">  
                <ModifyItemButton 
                    name="Transaction" 
                    width="186px"
                    yPosition="32px"
                    xPosition="-7px"
                    showEdit={false}
                    handleDelete={() => setShowDeleteModal(true)} 
                    handleEdit={() => setShowEditModal(true)}
                />
                    {name}
            </div>
            <div className="min-w-[100px]">
                <p>{category}</p>
            </div>
            <div className="min-w-[100px]">
                <p>{formatDate(date)}</p>
            </div>
            <div className={`flex-1 text-right ${amount > 0 ? 'text-green' : ''} font-bold`}>
                {amount > 0 ? '+' : '-'}${Math.abs(amount)}
            </div>
            </>
        :
            <>
            <div className="flex gap-3">
                <ModifyItemButton
                name="Transaction"
                width="186px"
                yPosition="60px"
                xPosition="-7px"
                handleDelete={() => setShowDeleteModal(true)}
                handleEdit={() => setShowEditModal(true)}
                />
                <div className="flex flex-col gap-1">
                    <span className="font-bold max-w-[120px] sm:max-w-none text-ellipsis">{name}</span>
                    <p>{category}</p>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <div className={`text-right ${amount > 0 ? 'text-green' : ''} font-bold`}>
                    {amount > 0 ? '+' : '-'}${Math.abs(amount)}
                </div>
                <p className="text-right">{formatDate(date)}</p>
            </div>
            </>
        }

        {showEditModal && <TransactionForm isAddNew={false} setShowModal={setShowEditModal} transaction={transaction}/>}
        {showDeleteModal && 
        <DeleteConfirmation 
            label="transaction"
            title={`Delete '${transaction.name}'?`} 
            setShowModal={setShowDeleteModal} 
            handleConfirm={handleDelete} 
            loadingStatus={loadingStatus.deleteTransaction}
            error={error.deleteTransaction}
        />}
    </div>
  )
}

export default TransactionItem;