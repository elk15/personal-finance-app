import { useState } from "react";
import { Label } from "../styled-components";
import ShowPasswordIcon from "../assets/images/icon-show-password.svg?react"
import HidePasswordIcon from "../assets/images/icon-hide-password.svg?react"

interface TextInputProps {
    label: string;
    placeholder: string;
    showCharactersLeft?: boolean;
    hasDollar?: boolean;
    type:string;
    id: string;
    value: string;
    setValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isRegister?: boolean;
}

const TextInput = ({
    label, 
    placeholder, 
    showCharactersLeft, 
    hasDollar, 
    type, 
    id,
    value,
    setValue,
    isRegister
} : TextInputProps) => {
    const maxValueLength = 30
    const [charactersLeft, setCharactersLeft] = useState<number>(maxValueLength - value.length);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e)

        if (showCharactersLeft) {
            const valueLength = e.currentTarget.value.length
            setCharactersLeft(maxValueLength - valueLength)
        }
    }

  return (
    <div className={`flex flex-col gap-1 relative
    ${hasDollar && 'after:content-["$"] after:absolute after:top-[38px] after:left-[16px] after:text-grey-300'}`}>
        <Label htmlFor={id}>{label}</Label>
        <input type={(type == 'password' && showPassword) ? 'text' : type} 
        name={id} id={id} placeholder={placeholder}
        className={`border border-grey-300 py-3 px-4 rounded-lg focus:outline-none focus:border-grey-900
            ${hasDollar && 'pl-9'}`}
        value={value} onChange={handleChange} maxLength={maxValueLength}/>
        {showCharactersLeft &&
            <p className="text-right text-[12px]">{charactersLeft} characters left</p>
        }
        {type == 'password' && 
            <button className="absolute right-4 top-[45px]" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <ShowPasswordIcon /> : <HidePasswordIcon />}
            </button>
        }
        {isRegister && type == 'password' && <p className="text-right text-[12px]">Passwords must be at least 8 characters</p>}
    </div>
  )
}

export default TextInput;