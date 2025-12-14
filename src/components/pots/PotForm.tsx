import { FormEvent, useEffect, useState } from "react";
import COLORS from "../../statics/colours";
import { Pot, Theme } from "../../types";
import FormPopup from "../FormPopup";
import SelectInput from "../SelectInput";
import TextInput from "../TextInput";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { capitalize } from "../../utils";
import { createPot, setPotsError, updatePot } from "../../reducers/potReducer";
import { ErrorText } from "../../styled-components";
import { useAuth } from "../../contexts/AuthContext";

interface PotFormProps {
    isAddNew: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    pot?: Pot;
}

const PotForm = ({isAddNew, setShowModal, pot} : PotFormProps) => {
    const [name, setName] = useState<string>('')
    const [target, setTarget] = useState<number>(0)
    const [theme, setTheme] = useState<Theme>(Theme.Green)
    const dispatch = useAppDispatch()
    const {user} = useAuth();
    const { data, loadingStatus, error } = useAppSelector((state) => state.pots)
    
    const themesUsed = data.map(pot => pot.theme)

    useEffect(() => {
      if (pot) {
        setName(pot.name)
        setTarget(pot.target)
        setTheme(pot.theme)
      }
    }, [pot])

    const handleConfirm = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!user) return

      if ((isAddNew && themesUsed.includes(theme)) ||
        (!isAddNew && themesUsed.includes(theme) && pot?.theme !== theme)
      ) {
        const operationName = isAddNew ? 'createPot' : 'updatePot'
        dispatch(setPotsError({operationName, text: `${capitalize(theme)} theme is already used.`}))
        return
      }

      if (isAddNew) {
        const newPot = {
          name, target, theme, total_saved: 0
        }
        dispatch(createPot({newPot})).then(() => {
          setShowModal(false)
        })

      } else {
        if (pot) {
          const updatedPot = {
            name, target, theme, id: pot.id, total_saved: pot.total_saved
          }
          dispatch(updatePot({updatedPot})).then(() => {
            setShowModal(false)
          })
        }
      }
    }

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
        loading={isAddNew ? loadingStatus.createPot : loadingStatus.updatePot}
        subtitle={<ErrorText>{isAddNew ? error.createPot : error.updatePot}</ErrorText>}
        text={text}>
            <TextInput 
            label="Pot Name" 
            showCharactersLeft={true} 
            maxLength={30}
            placeholder="e.g. Rainy Days"
            type="text" id="pot-name"
            value={name} setValue={e => setName( e.currentTarget.value)}/>
            <TextInput 
            label="Target" 
            hasDollar={true} 
            placeholder="e.g. 2000"
            type="number" id="pot-target"
            value={target.toString()} setValue={e => setTarget( parseFloat(e.currentTarget.value))}/>
            <SelectInput 
            options={Object.keys(COLORS) as Theme[]}
            name="Theme"
            isColors={true}
            value={theme}
            usedItems={themesUsed}
            setValue={(theme) => setTheme(theme as Theme)}/>
    </FormPopup>
  )
}

export default PotForm;