import { FormEvent, useEffect, useState } from "react";
import COLORS from "../../statics/colours";
import { Pot, Theme } from "../../types";
import FormPopup from "../FormPopup";
import SelectInput from "../SelectInput";
import TextInput from "../TextInput";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { capitalize, getAuthHeader } from "../../utils";
import { createPot, setPotsError, updatePot } from "../../reducers/potReducer";
import { ErrorText } from "../../styled-components";

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
    const { userToken } = useAppSelector((state) => state.user)
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
      if (!userToken) return
      const config = getAuthHeader(userToken)

      if ((isAddNew && themesUsed.includes(theme)) ||
        (!isAddNew && themesUsed.includes(theme) && pot?.theme !== theme)
      ) {
        const operationName = isAddNew ? 'createPot' : 'updatePot'
        dispatch(setPotsError({operationName, text: `${capitalize(theme)} theme is already used.`}))
        return
      }

      if (isAddNew) {
        const newPot = {
          name, target, theme, totalSaved: 0
        }
        dispatch(createPot({newPot, config})).then(() => {
          setShowModal(false)
        })

      } else {
        if (pot?.id) {
          const updatedPot = {
            name, target, theme, id: pot.id, totalSaved: pot.totalSaved
          }
          dispatch(updatePot({updatedPot, config})).then(() => {
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
            value={target.toString()} setValue={e => setTarget( parseInt(e.currentTarget.value))}/>
            <SelectInput 
            options={Object.keys(COLORS) as Theme[]}
            name="Theme"
            isColors={true}
            value={theme}
            themesUsed={themesUsed}
            setValue={(theme: Theme) => setTheme(theme)}/>
    </FormPopup>
  )
}

export default PotForm;