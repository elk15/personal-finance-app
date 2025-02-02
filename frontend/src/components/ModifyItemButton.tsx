import { useState } from 'react';
import ElipsisIcon from '../assets/images/icon-ellipsis.svg?react'

interface ModifyItemButtonProps {
    name: string;
    handleEdit: () => void;
    handleDelete: () => void;
    width?: string;
    xPosition?: string;
}

const ModifyItemButton = ({name, handleEdit, handleDelete, width, xPosition} : ModifyItemButtonProps) => {
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  return (
    <div className='relative'>
        <button onClick={() => setIsPopupOpen(!isPopupOpen)}><ElipsisIcon/></button>
        {isPopupOpen && 
            <>
            <div style={{width: width || '118px', transform: `translateX(${xPosition || '-99px'})`}} className={`rounded-lg shadow-lg flex flex-col p-2 optionsPopup absolute z-30 
            bg-white translate-y-[7px]`}>
                <button onClick={handleEdit} className="border-b-2 border-grey-100 p-3 pt-1 text-left">Edit {name}</button>
                <button onClick={handleDelete} className="text-red p-3 pb-1 text-left">Delete {name}</button>
            </div>
            <div onClick={() => setIsPopupOpen(false)} className='z-20 w-full h-full top-0 bottom-0 left-0 fixed'></div>
            </>
        }
    </div>
  )
}

export default ModifyItemButton;