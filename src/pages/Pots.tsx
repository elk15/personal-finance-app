import { useState } from "react";
import PotCard from "../components/pots/PotCard";
import { HeaderPreset1, PrimaryButton } from "../styled-components";
import PotForm from "../components/pots/PotForm";
import { useAppSelector } from "../components/hooks/hooks";

const Pots = () => {
    const { data, loadingStatus } = useAppSelector((state) => state.pots)
    const [showAddNew, setShowAddNew] = useState<boolean>(false);

    return (
      <>
        <div className="flex justify-between items-center mb-4">
            <HeaderPreset1>Pots</HeaderPreset1>
            <PrimaryButton onClick={() => setShowAddNew(true)}>Add Pot</PrimaryButton>
        </div>
        <div className="flex lg:flex-wrap lg:flex-row flex-col gap-4 ">
            {loadingStatus.initializePots == 'pending' && 
              <div className="m-auto mt-10">
                <l-dot-wave
                size="47"
                speed="1"
                color="black"
                ></l-dot-wave>
              </div>
            }
            {data.map(pot => <PotCard key={pot.id} name={pot.name} total_saved={pot.total_saved} target={pot.target} theme={pot.theme} id={pot.id}/>)}
        </div>
        {showAddNew &&
          <PotForm isAddNew={true} setShowModal={setShowAddNew}/>
        }
      </>
    )
  }
  
  export default Pots