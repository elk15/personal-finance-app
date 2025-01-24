import { useState } from "react";
import COLORS from "../../statics/colours";
import { Card, HeaderPreset2, SecondaryButton } from "../../styled-components";
import { Pot, Theme } from "../../types";
import ModifyItemButton from "../ModifyItemButton";
import PotForm from "./PotForm";

interface PotCardProps {
    name: string;
    target: string;
    theme: Theme;
    totalSaved: number;
}

const PotCard = ({name, target, theme, totalSaved} : PotCardProps) => {
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [pot, setPot] = useState<Pot>({
        name, target, theme, totalSaved
    }) 
    const displayDeleteModal = () => {

    }

    const displayEditModal = () => {
        setShowEditModal(true)
    }
    const editPot = () => {

    }
    const percentage = pot.totalSaved*100/parseInt(target)
    const themeStyle = { backgroundColor: COLORS[theme] }

  return (
    <Card className="max-w-[calc(50%-16px)]" $gap={'32px'}>
        <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
                <div style={themeStyle} className={`rounded-full w-4 h-4`}></div>
                <HeaderPreset2>{name}</HeaderPreset2>
            </div>
            <ModifyItemButton name="Pot" handleDelete={displayDeleteModal} handleEdit={displayEditModal}/>
        </div>
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <p>Total Saved</p>
                <span className="font-bold text-[2rem]">${totalSaved.toFixed(2)}</span>
            </div>
            <div className="w-full bg-beige-100 h-[8px] rounded-lg">
                <div style={themeStyle} className={`w-[7.95%] h-[8px] rounded-lg`}></div>
            </div>
            <div className="flex items-center justify-between">
                <p className="font-bold">{percentage.toFixed(2)}%</p>
                <p>Target of ${target.toLocaleString()}</p>
            </div>
        </div>
        <div className="flex gap-4">
            <SecondaryButton>+ Add Money</SecondaryButton>
            <SecondaryButton>Withdraw</SecondaryButton>
        </div>
        {showEditModal &&
        <PotForm isAddNew={false} handleConfirm={editPot} setShowModal={setShowEditModal} pot={pot} setPot={setPot}/>
        }
    </Card>
  )
}

export default PotCard;