import { FormEvent, useState } from "react";
import { Pot } from "../../types";
import FormPopup from "../FormPopup";
import TextInput from "../TextInput";
import SavingProgressBar from "./SavingProgressBar";
import { updatePot } from "../../reducers/potReducer";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { ErrorText } from "../../styled-components";
import { useAuth } from "../../contexts/AuthContext";

interface UpdateTotalSavedFormProps {
    pot: Pot;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    max_amount: number;
    defaultAmount: number;
    isWithdraw?: boolean;
}

const UpdateTotalSavedForm = ({pot, setShowModal, max_amount, defaultAmount, isWithdraw = false} : UpdateTotalSavedFormProps) => {
    const [amount, setAmount] = useState<number>(Math.min(defaultAmount, max_amount))
    const dispatch = useAppDispatch()
    const {user} = useAuth();
    const { loadingStatus, error } = useAppSelector((state) => state.pots)

    const handleSetValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.currentTarget.value)
        setAmount(Math.min(value, max_amount))
    }

    const handleConfirm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!setShowModal || !user) return

        const updatedPot = {
            ...pot,
            total_saved: isWithdraw ? pot.total_saved - amount : pot.total_saved + amount
        }
            
        dispatch(updatePot({updatedPot})).then(() => {
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
            type="number" id="pot-total_saved"
            max={max_amount}
            value={amount.toString()} setValue={handleSetValue}/>
    </FormPopup>
  )
}

export default UpdateTotalSavedForm;