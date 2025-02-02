import { FormEvent, useState } from "react";
import { Card, HeaderPreset2 } from "../../styled-components";
import { Budget } from "../../types";
import COLORS from "../../statics/colours";
import ModifyItemButton from "../ModifyItemButton";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getAuthHeader, sortTransactions } from "../../utils";
import SeeMoreButton from "../SeeMoreButton";
import LatestSpendingItem from "./LatestSpendingItem";
import BudgetForm from "./BudgetForm";
import DeleteConfirmation from "../DeleteConfirmation";
import { deleteBudget } from "../../reducers/budgetReducer";

const BudgetCard = ({category, theme, maxAmount, id} : Budget) => {
    const [showEditModal, setShowEditModal] = useState<boolean>(false)
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
    const { data: transactions } = useAppSelector((state) => state.transactions)
    const { loadingStatus, error } = useAppSelector((state) => state.budgets)
    const { userToken } = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()

    const handleDelete = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!userToken) return
            const config = getAuthHeader(userToken)
            dispatch(deleteBudget({id, config})).then(() => {
                setShowDeleteModal(false)
        })
    }

    const categoryTransactions = sortTransactions(transactions.filter(t => t.category == category && t.amount < 0))
    const moneySpent = categoryTransactions.reduce((sum, curr) => sum + curr.amount , 0) * -1
    const moneySpentPercentage = moneySpent*100/maxAmount
    const remaining = maxAmount - moneySpent
    
    const themeStyle = { 
        backgroundColor: COLORS[theme],
    }
    const borderStyle = {
        borderColor: COLORS[theme]
    }
    const widthStyle = {
        width: `${moneySpentPercentage > 100 ? '100' : moneySpentPercentage.toFixed(0)}%`
    }
    const budget = {
        category, theme, maxAmount, id
    }

  return (
    <Card $gap={'20px'}>
        <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
                <div style={themeStyle} className={`rounded-full w-4 h-4`}></div>
                <HeaderPreset2>{category}</HeaderPreset2>
            </div>
            <ModifyItemButton name="Budget" width="147px" xPosition="-128px" handleDelete={() => setShowDeleteModal(true)} handleEdit={() => setShowEditModal(true)}/>
        </div>
        <p>Maximum of ${maxAmount.toFixed(2)}</p>
        <div className="w-full bg-beige-100 h-7 rounded px-1">
            <div style={{...themeStyle, ...widthStyle}} className={`h-5 rounded relative top-1`}></div>
        </div>
        <div className="flex pl-1">
            <div className="flex-1 flex flex-col gap-2 border-l-4 pl-4" style={borderStyle}> 
                <span className="text">Spent</span> 
                <span className="font-bold">${moneySpent.toFixed(2)}</span>
            </div>
            <div className="flex-1 flex flex-col gap-2 border-l-4 pl-4 border-beige-100"> 
                <span className="text">Remaining</span> 
                <span className="font-bold">${remaining < 0 ? 0 : remaining.toFixed(2)}</span>
            </div>
        </div>
        {categoryTransactions.length > 1 &&
            <div className="w-full p-2 bg-beige-100 rounded-xl mt-1">
                <div className="flex justify-between items-center p-3">
                    <h4>Latest Spending</h4>
                    <SeeMoreButton toPage="/transactions"/>
                </div>
                <div className="px-3 flex flex-col">
                    {categoryTransactions.slice(0, 3).map(t => <LatestSpendingItem key={t.id} name={t.name} cost={t.amount} date={t.date}/>)}
                </div>
            </div>
        }
        {showEditModal && <BudgetForm isAddNew={false} setShowModal={setShowEditModal} budget={budget}/>}
        {showDeleteModal && <DeleteConfirmation 
        label="budget"
        title={`Delete '${budget.category}'?`} 
        setShowModal={setShowDeleteModal} 
        handleConfirm={handleDelete} 
        loadingStatus={loadingStatus.deleteBudget}
        error={error.deleteBudget}
        />}
    </Card>
  )
}

export default BudgetCard;