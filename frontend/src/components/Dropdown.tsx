import CaretIcon from '../assets/images/icon-caret-down.svg?react'
import SortByIcon from '../assets/images/icon-sort-mobile.svg?react'
import { useEffect, useRef, useState } from "react";
import { SortBy, TransactionCategory } from "../types";
import useScreenWidth from './hooks/useScreenWidth';

interface DropdownProps {
    options: SortBy[] | TransactionCategory[];
    name?: string;
    value: SortBy | TransactionCategory;
    setValue: ((value: TransactionCategory | SortBy) => void);
}

const Dropdown = ({options, name = "Sort by", value, setValue} : DropdownProps) => {
    const [showOptions, setShowOptions] = useState<boolean>(false)
    const optionsRef = useRef<HTMLDivElement>(null);
    const optionsButtonRef = useRef<HTMLButtonElement>(null);
    const screenWidth = useScreenWidth()    

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

    const handleOptionSelect = (option: SortBy | TransactionCategory) => {
        setValue(option)
        setShowOptions(false)
    }

  return (
    <div className="flex gap-4 relative items-center sm:flex-1 justify-end">
        {screenWidth > 640 ?
            <>
                <p>{name}</p>
                <button onClick={() => setShowOptions(!showOptions)} ref={optionsButtonRef}
                className="relative w-[110px] flex items-center gap-3 border border-grey-300 py-3 px-4 rounded-lg focus:outline-none focus:border-grey-500">
                    <span className="text-[15px]">{value}</span>
                    <span className="absolute right-4"><CaretIcon/></span>
                </button>
            </>
            :
            <button onClick={() => setShowOptions(!showOptions)} ref={optionsButtonRef}><SortByIcon/></button>
        }

        {showOptions &&
            <div ref={optionsRef} className="flex flex-col p-3 py-0 bg-white absolute optionsPopup 
            rounded-lg w-[110px] h-[290px] sm:top-[60px] top-[25px] right-[0px] overflow-y-auto z-10">
                {options.map((option) => {
                return  <div onClick={() => handleOptionSelect(option)}
                    className={`flex items-center gap-3 p-2 py-3 border-b border-grey-100 last:border-b-0 relative cursor-pointer`} key={String(option)}>
                        <span className={`text-[15px] ${option == value ? 'font-bold' : ''}`}>{option}</span>
                    </div>
                })}
            </div>
        }
    </div>
  )
}

export default Dropdown;