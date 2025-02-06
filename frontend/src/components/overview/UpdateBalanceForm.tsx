import { FormEvent, useState } from "react";
import FormPopup from "../FormPopup";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import TextInput from "../TextInput";
import { ErrorText } from "../../styled-components";
import { getAuthHeader } from "../../utils";
import { getBalance } from "../../reducers/userReducer";

interface UpdateBalaceFormProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateBalaceForm = ({setShowModal} : UpdateBalaceFormProps) => {
    const dispatch = useAppDispatch()
    const { balance: originalBalance, userToken, error, loadingStatus, email } = useAppSelector((state) => state.user)
    const [balance, setBalance] = useState<number>(originalBalance)

    const handleConfirm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!userToken || !email) return
        const config = getAuthHeader(userToken)

        dispatch(getBalance({obj: {balance, email}, config})).then(() => {
            setShowModal(false)
        })
    }

  return (
    <FormPopup 
        title="Update Balance" 
        buttonText="Save Changes"
        handleConfirm={handleConfirm} 
        setShowModal={setShowModal}
        loading={loadingStatus.getBalance}
        subtitle={<ErrorText>{error.getBalance}</ErrorText>}
        >
            <TextInput 
            label="Current Balance" 
            hasDollar={true} 
            placeholder=" "
            type="number" id="balance"
            value={balance.toString()} setValue={e => setBalance( parseInt(e.currentTarget.value))}/>
    </FormPopup>
  )
}

export default UpdateBalaceForm;