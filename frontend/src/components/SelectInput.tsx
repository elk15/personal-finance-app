import { Label } from "../styled-components";
import { capitalize } from "../utils";
import CaretIcon from '../assets/images/icon-caret-down.svg?react'
import { useEffect, useRef, useState } from "react";
import COLORS from "../statics/colours";
import { Theme } from "../types";

interface SelectInputProps {
    options: Theme[];
    name: string;
    isColors?: boolean;
    value: Theme;
    setValue: (theme: Theme) => void;
    themesUsed: Theme[];
}

const SelectInput = ({options, name, isColors, value, setValue, themesUsed} : SelectInputProps) => {
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

    const renderColorDiv = (option: Theme, isUsed?: boolean) => {
        if (!isColors) return null;
        return (
            <div 
                style={{backgroundColor: COLORS[option]}}
                className={`w-4 h-4 rounded-full ${isUsed ? 'opacity-50' : ''}`}
            />
        );
    };

    const handleOptionSelect = (option: Theme) => {
        setValue(option)
        setShowOptions(false)
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
            <div ref={optionsRef} className="flex flex-col p-3 py-0 bg-white absolute optionsPopup rounded-lg w-full h-[250px] top-[80px] overflow-y-scroll">
                {options.map((option) => {
                const isUsed = themesUsed.includes(option)
                return  <div onClick={() => handleOptionSelect(option as Theme)}
                    className={`${isUsed ? 'pointer-events-none' : 'cursor-pointer'} flex items-center gap-3 p-2 py-3 border-b border-grey-100 last:border-b-0 relative`} key={option}>
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