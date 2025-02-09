import { Label } from "../styled-components";
import { capitalize } from "../utils";
import CaretIcon from '../assets/images/icon-caret-down.svg?react'
import { useEffect, useRef, useState } from "react";
import COLORS from "../statics/colours";
import { Theme, TransactionCategory } from "../types";

interface SelectInputProps {
    options: Theme[] | TransactionCategory[];
    name: string;
    isColors?: boolean;
    value: Theme | TransactionCategory;
    setValue: ((value: TransactionCategory | Theme) => void);
    usedItems?: Theme[] | TransactionCategory[];
}

const SelectInput = ({options, name, isColors, value, setValue, usedItems} : SelectInputProps) => {
    const [showOptions, setShowOptions] = useState<boolean>(false)
    const optionsRef = useRef<HTMLDivElement>(null);
    const optionsButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (showOptions) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    },[showOptions])

    const handleClickOutside = (event: MouseEvent) => {
        if (optionsRef.current 
            && optionsButtonRef.current
            && !optionsRef.current.contains(event.target as Node)
            && !optionsButtonRef.current.contains(event.target as Node)
        ) {
            setShowOptions(false);
        }
    }

    const renderColorDiv = (option: Theme | TransactionCategory, isUsed?: boolean) => {
        if (!isColors) return null;
        return (
            <div 
                style={{backgroundColor: COLORS[option as Theme]}}
                className={`w-4 h-4 rounded-full ${isUsed ? 'opacity-50' : ''}`}
            />
        );
    };

    const handleOptionSelect = (option: Theme | TransactionCategory) => {
        setValue(option)
        setShowOptions(false)
    }

    const isOptionUsed = (option: Theme | TransactionCategory) => {
        if (!usedItems) return
        let result
        let array

        if (isColors) {
            array = usedItems as Theme[]
            result = array.includes(option as Theme)
        } else {
            array = usedItems as TransactionCategory[]
            result = array.includes(option as TransactionCategory)
        }
        return result
    }

  return (
    <div className="flex flex-col gap-1 relative">
        <Label>{name}</Label>
        <button onClick={() => setShowOptions(!showOptions)} ref={optionsButtonRef} type="button"
        className="relative flex items-center gap-3 border border-grey-300 py-3 px-4 rounded-lg focus:outline-none focus:border-grey-900">
            {renderColorDiv(value)} 
            <span className="text-[15px]">{capitalize(value)}</span>
            <span className="absolute right-4"><CaretIcon/></span>
        </button>
        {showOptions &&
            <div ref={optionsRef} className="flex flex-col p-3 py-0 bg-white absolute optionsPopup rounded-lg w-full h-[250px] top-[80px] overflow-y-scroll z-10">
                {options.map((option) => {
                const isUsed = isOptionUsed(option)
                return  <div onClick={() => handleOptionSelect(option)}
                    className={`${isUsed ? 'pointer-events-none' : 'cursor-pointer'} flex items-center gap-3 p-2 py-3 border-b border-grey-100 last:border-b-0 relative`} key={String(option)}>
                        {renderColorDiv(option, isUsed)} 
                        <span className={`text-[15px] ${isUsed ? 'text-grey-300' : ''}`}>{capitalize(option)}</span>
                        {isUsed && <p className="absolute right-2 text-sm text-grey-300">Already used</p>}
                    </div>
                })}
            </div>
        }

    </div>
  )
}

export default SelectInput;