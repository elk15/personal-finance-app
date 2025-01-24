import { useState } from "react";
import PotCard from "../components/pots/PotCard";
import { HeaderPreset1, PrimaryButton } from "../styled-components";
import { Pot, Theme } from "../types";
import PotForm from "../components/pots/PotForm";

const Pots = () => {
    const [showAddNew, setShowAddNew] = useState<boolean>(false);
    const [newPot, setNewPot] = useState<Pot>({
      name: '',
      target: '',
      theme: Theme.Green,
      totalSaved: 0,
    })

    const addNewPot = () => {

    }

    return (
      <>
        <div className="flex justify-between items-center">
            <HeaderPreset1 className="mb-4">Pots</HeaderPreset1>
            <PrimaryButton onClick={() => setShowAddNew(true)}>+ Add New Pot</PrimaryButton>
        </div>
        <div className="flex flex-wrap gap-4 ">
            <PotCard name="Savings" totalSaved={159} target="2000" theme={Theme.Green}/>
        </div>
        {showAddNew &&
          <PotForm isAddNew={true} handleConfirm={addNewPot} setShowModal={setShowAddNew} pot={newPot} setPot={setNewPot}/>
        }
      </>
    )
  }
  
  export default Pots