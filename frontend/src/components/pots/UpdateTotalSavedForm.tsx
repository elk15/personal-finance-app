import { FormEvent, useState } from "react";
import { Pot } from "../../types";
import FormPopup from "../FormPopup";
import TextInput from "../TextInput";
import SavingProgressBar from "./SavingProgressBar";
import { updatePot } from "../../reducers/potReducer";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getAuthHeader } from "../../utils";
import { ErrorText } from "../../styled-components";
import { getBalance } from "../../reducers/userReducer";

interface UpdateTotalSavedFormProps {
    pot: Pot;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    maxAmount: number;
    defaultAmount: number;
    isWithdraw?: boolean;
}

const UpdateTotalSavedForm = ({pot, setShowModal, maxAmount, defaultAmount, isWithdraw = false} : UpdateTotalSavedFormProps) => {
    const [amount, setAmount] = useState<number>(Math.min(defaultAmount, maxAmount))
    const dispatch = useAppDispatch()
    const { userToken, balance, email } = useAppSelector((state) => state.user)
    const { loadingStatus, error } = useAppSelector((state) => state.pots)

    const handleSetValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.currentTarget.value)
        setAmount(Math.min(value, maxAmount))
    }

    const handleConfirm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!setShowModal || !userToken) return

        const config = getAuthHeader(userToken)
        const updatedPot = {
            ...pot,
            totalSaved: isWithdraw ? pot.totalSaved - amount : pot.totalSaved + amount
        }
            
        dispatch(updatePot({updatedPot, config})).then(() => {
            const obj = {
                email,
                balance: isWithdraw ? balance + amount : balance - amount
            }
            dispatch(getBalance({obj, config}))
            setShowModal(false)
        })
    }

    let title = `Add to '${pot.name}'`
    let buttonText = 'Confirm Addition'
    let label = 'Amount to Add'

    if (isWithdraw) {
        title = `Withdraw from '${pot.name}'`
        buttonText = 'Confirm Withdraw'
        label = 'Amount to Withdraw'
    }

  return (
    <FormPopup title={title} buttonText={buttonText} setShowModal={setShowModal} handleConfirm={handleConfirm}
        loading={loadingStatus.updatePot} subtitle={<ErrorText>{error.updatePot}</ErrorText>}>
            <SavingProgressBar pot={pot} title="New Amount" showNewAmount={true} newAmount={amount} isWithdraw={isWithdraw}/>
            <TextInput 
            label={label}
            hasDollar={true} 
            placeholder="e.g. 100"
            type="number" id="pot-totalSaved"
            max={maxAmount}
            value={amount.toString()} setValue={handleSetValue}/>
    </FormPopup>
  )
}

export default UpdateTotalSavedForm;