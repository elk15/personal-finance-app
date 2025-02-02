import { FormEvent, useState } from "react";
import COLORS from "../../statics/colours";
import { Card, HeaderPreset2, SecondaryButton } from "../../styled-components";
import { Pot} from "../../types";
import ModifyItemButton from "../ModifyItemButton";
import PotForm from "./PotForm";
import AddMoneyForm from "./AddMoneyForm";
import SavingProgressBar from "./SavingProgressBar";
import WithdrawMoneyForm from "./WithdrawMoneyForm";
import DeleteConfirmation from "../DeleteConfirmation";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getAuthHeader } from "../../utils";
import { deletePot } from "../../reducers/potReducer";

const PotCard = ({name, target, theme, totalSaved, id} : Pot) => {
    const [showEditModal, setShowEditModal] = useState<boolean>(false)
    const [showAddMoneyModal, setShowAddMoneyModal] = useState<boolean>(false)
    const [showWithdrawMoneyModal, setShowWithdrawMoneyModal] = useState<boolean>(false)
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
    const { userToken } = useAppSelector((state) => state.user)
    const { loadingStatus, error } = useAppSelector((state) => state.pots)
    const dispatch = useAppDispatch()

    const handleDelete = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!userToken) return
        const config = getAuthHeader(userToken)
        dispatch(deletePot({id, config})).then(() => {
            setShowDeleteModal(false)
        })
    }

    const themeStyle = { backgroundColor: COLORS[theme] }
    const pot = {
        id, name, target, theme, totalSaved
    }

  return (
    <Card className="lg:max-w-[calc(50%-16px)]" $gap={'32px'}>
        <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
                <div style={themeStyle} className={`rounded-full w-4 h-4`}></div>
                <HeaderPreset2>{name}</HeaderPreset2>
            </div>
            <ModifyItemButton name="Pot" handleDelete={() => setShowDeleteModal(true)} handleEdit={() => setShowEditModal(true)}/>
        </div>
        <SavingProgressBar pot={pot}/>
        <div className="flex gap-4">
            <SecondaryButton onClick={() => setShowAddMoneyModal(true)}>+ Add Money</SecondaryButton>
            <SecondaryButton onClick={() => setShowWithdrawMoneyModal(true)}>Withdraw</SecondaryButton>
        </div>
        {showEditModal && <PotForm isAddNew={false} setShowModal={setShowEditModal} pot={pot}/>}
        {showAddMoneyModal && <AddMoneyForm setShowModal={setShowAddMoneyModal} pot={pot}/>}
        {showWithdrawMoneyModal && <WithdrawMoneyForm setShowModal={setShowWithdrawMoneyModal} pot={pot}/>}
        {showDeleteModal && <DeleteConfirmation 
        label="pot"
        title={`Delete '${pot.name}'?`} 
        setShowModal={setShowDeleteModal} 
        handleConfirm={handleDelete} 
        loadingStatus={loadingStatus.deletePot}
        error={error.deletePot}
        />}
    </Card>
  )
}

export default PotCard;