import { useState } from 'react';
import ElipsisIcon from '../assets/images/icon-ellipsis.svg?react'

interface ModifyItemButtonProps {
    name: string;
    handleEdit: () => void;
    handleDelete: () => void;
    width?: string;
    xPosition?: string;
    yPosition?: string;
    showEdit?: boolean;
}

const ModifyItemButton = ({name, handleEdit, handleDelete, width, xPosition, yPosition, showEdit = true} : ModifyItemButtonProps) => {
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  return (
    <div className='relative flex items-center'>
        <button onClick={() => setIsPopupOpen(!isPopupOpen)}><ElipsisIcon/></button>
        {isPopupOpen && 
            <>
            <div style={{width: width || '118px', transform: `translate(${xPosition || '-99px'}, ${yPosition || '59px'})`}} 
            className={`rounded-lg shadow-lg flex flex-col px-2 optionsPopup absolute z-30 bg-white translate-y-[7px]`}>
                {showEdit && <button onClick={handleEdit} className="border-b-2 border-grey-100 p-3 text-left">Edit {name}</button>}
                <button onClick={handleDelete} className="text-red p-3 text-left">Delete {name}</button>
            </div>
            <div onClick={() => setIsPopupOpen(false)} className='z-20 w-full h-full top-0 bottom-0 left-0 fixed'></div>
            </>
        }
    </div>
  )
}

export default ModifyItemButton;