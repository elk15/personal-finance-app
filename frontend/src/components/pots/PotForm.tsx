import COLORS from "../../statics/colours";
import { Pot, Theme } from "../../types";
import FormPopup from "../FormPopup";
import SelectInput from "../SelectInput";
import TextInput from "../TextInput";

interface PotFormProps {
    isAddNew: boolean;
    handleConfirm: () => void;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    pot: Pot;
    setPot: (value: React.SetStateAction<Pot>) => void;
}

const PotForm = ({isAddNew, handleConfirm, setShowModal, pot, setPot} : PotFormProps) => {
    const title = isAddNew ? 'Add New Pot' : 'Edit Pot'
    const buttonText = isAddNew ? 'Add Pot' : 'Save Changes'
    const text = isAddNew ? 
        'Create a pot to set savings targets. These can help keep you on track as you save for special purchases.' :
        'If your saving targets change, feel free to update your pots.'
  return (
    <FormPopup 
        title={title} 
        buttonText={buttonText} 
        handleConfirm={handleConfirm} 
        setShowModal={setShowModal}
        text={text}>
            <TextInput 
            label="Pot Name" 
            showCharactersLeft={true} 
            placeholder="e.g. Rainy Days"
            type="text" id="pot-name"
            value={pot.name} setValue={e => setPot({
              ...pot,
              name: e.currentTarget.value
            })}/>
            <TextInput 
            label="Target" 
            hasDollar={true} 
            placeholder="e.g. 2000"
            type="number" id="pot-target"
            value={pot.target} setValue={e => setPot({
              ...pot,
              target: e.currentTarget.value
            })}/>
            <SelectInput 
            options={Object.keys(COLORS) as Theme[]}
            name="Theme"
            isColors={true}
            value={pot.theme}
            setValue={(theme: Theme) => setPot({
                ...pot,
                theme: theme
            })}/>
    </FormPopup>
  )
}

export default PotForm;