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
}

const SelectInput = ({options, name, isColors, value, setValue} : SelectInputProps) => {
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

    const renderColorDiv = (option: Theme) => {
        if (!isColors) return null;
        return (
            <div 
                style={{backgroundColor: COLORS[option]}}
                className="w-4 h-4 rounded-full"
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
        <button onClick={() => setShowOptions(!showOptions)} ref={optionsButtonRef}
        className="relative flex items-center gap-3 border border-grey-300 py-3 px-4 rounded-lg focus:outline-none focus:border-grey-900">
            {renderColorDiv(value)} 
            <span className="text-[15px]">{capitalize(value)}</span>
            <span className="absolute right-4"><CaretIcon/></span>
        </button>
        {showOptions &&
            <div ref={optionsRef} className="flex flex-col p-3 py-0 bg-white absolute optionsPopup rounded-lg w-full h-[250px] top-[80px] overflow-y-scroll">
                {options.map((option) => 
                    <div onClick={() => handleOptionSelect(option as Theme)}
                    className="cursor-pointer flex items-center gap-3 p-2 py-3 border-b border-grey-100 last:border-b-0" key={option}>
                        {renderColorDiv(option)} 
                        <span className="text-[15px]">{capitalize(option)}</span>
                    </div>
                )}
            </div>
        }

    </div>
  )
}

export default SelectInput;