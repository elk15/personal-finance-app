import { FormEvent } from "react";
import FormPopup from "./FormPopup";
import { ErrorText } from "../styled-components";
import { LoadingState } from "../types";

interface DeleteConfirmationProps {
    title: string
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    handleConfirm: (e: FormEvent<HTMLFormElement>) => void
    error: string | null
    loadingStatus: LoadingState
    label: string
}

const DeleteConfirmation = ({title, setShowModal, handleConfirm, error, loadingStatus, label} : DeleteConfirmationProps) => {
  return (
    <FormPopup title={title} buttonText={'Yes, Confirm Deletion'} setShowModal={setShowModal} handleConfirm={handleConfirm} isDelete={true}
    text={`Are you sure you want to delete this ${label}? This action cannot be reversed, and all the data inside it will be removed forever.`}
    loading={loadingStatus} subtitle={
    <>
    <button type="button" className="mt-3" onClick={() => setShowModal(false)}><p className="hover:text-grey-900">No, Go Back</p></button>
    <ErrorText>{error}</ErrorText>
    </>
    }>
    </FormPopup>
  )
}

export default DeleteConfirmation;