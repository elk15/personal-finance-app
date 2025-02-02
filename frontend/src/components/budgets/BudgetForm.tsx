import { FormEvent, useEffect, useState } from "react";
import { Budget, Theme, TransactionCategory } from "../../types";
import FormPopup from "../FormPopup";
import SelectInput from "../SelectInput";
import TextInput from "../TextInput";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { capitalize, getAuthHeader } from "../../utils";
import { createBudget, setBudgetsError, updateBudget } from "../../reducers/budgetReducer";
import { ErrorText } from "../../styled-components";

interface BudgetFormProps {
    isAddNew: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    budget?: Budget;
}

const BudgetForm = ({isAddNew, setShowModal, budget} : BudgetFormProps) => {
    const [category, setCategory] = useState<TransactionCategory>(TransactionCategory.Entertainment)
    const [maxAmount, setMaxAmount] = useState<number>(0)
    const [theme, setTheme] = useState<Theme>(Theme.Green)
    const dispatch = useAppDispatch()
    const { userToken } = useAppSelector((state) => state.user)
    const { data, loadingStatus, error } = useAppSelector((state) => state.budgets)
    
    const themesUsed = data.map(budget => budget.theme)
    const categoriesUsed = data.map(budget => budget.category)

    useEffect(() => {
      if (budget) {
        setCategory(budget.category)
        setMaxAmount(budget.maxAmount)
        setTheme(budget.theme)
      }
    }, [budget])

    const handleConfirm = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!userToken) return
      const config = getAuthHeader(userToken)
      const operationName = isAddNew ? 'createBudget' : 'updateBudget'

      if ((isAddNew && themesUsed.includes(theme)) ||
        (!isAddNew && themesUsed.includes(theme) && budget?.theme !== theme)
      ) {
        dispatch(setBudgetsError({operationName, text: `${capitalize(theme)} theme is already used.`}))
        return
      }

      if ((isAddNew && categoriesUsed.includes(category)) ||
      (!isAddNew && categoriesUsed.includes(category) && budget?.category !== category)
    ) {
      dispatch(setBudgetsError({operationName, text: `${capitalize(category)} category is already used.`}))
      return
    }

      if (isAddNew) {
        const newBudget = {
          category, maxAmount, theme
        }
        dispatch(createBudget({newBudget, config})).then(() => {
          setShowModal(false)
        })

      } else {
        if (budget?.id) {
          const updatedBudget = {
            category, maxAmount, theme, id: budget.id,
          }
          dispatch(updateBudget({updatedBudget, config})).then(() => {
            setShowModal(false)
          })
        }
      }
    }

    const title = isAddNew ? 'Add New Budget' : 'Edit Budget'
    const buttonText = isAddNew ? 'Add Budget' : 'Save Changes'
    const text = isAddNew ? 
        'Choose a category to set a spending budget. These categories can help you monitor spending.' :
        'As your budgets change, feel free to update your spending limits.'

  return (
    <FormPopup 
        title={title} 
        buttonText={buttonText} 
        handleConfirm={handleConfirm} 
        setShowModal={setShowModal}
        loading={isAddNew ? loadingStatus.createBudget : loadingStatus.updateBudget}
        subtitle={<ErrorText>{isAddNew ? error.createBudget : error.updateBudget}</ErrorText>}
        text={text}>
            <SelectInput 
            options={Object.values(TransactionCategory)}
            name="Budget Category"
            value={category}
            usedItems={categoriesUsed}
            setValue={(category) => setCategory(category as TransactionCategory)}/>
            <TextInput 
            label="Maximum Spend" 
            hasDollar={true} 
            placeholder="e.g. 2000"
            type="number" id="budget-max"
            value={maxAmount.toString()} setValue={e => setMaxAmount( parseInt(e.currentTarget.value))}/>
            <SelectInput 
            options={Object.values(Theme)}
            name="Theme"
            isColors={true}
            value={theme}
            usedItems={themesUsed}
            setValue={(theme) => setTheme(theme as Theme)}/>
    </FormPopup>
  )
}

export default BudgetForm;