import { Card, HeaderPreset1, PrimaryButton } from "../styled-components"
import CloseModalIcon from "../assets/images/icon-close-modal.svg?react"
import { FormEvent } from "react";
import { LoadingState } from "../types";

interface FormPopupProps {
    title: string;
    text?: string;
    buttonText: string;
    handleConfirm: (e: FormEvent<HTMLFormElement>) => void;
    children?: React.ReactNode;
    setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
    isAuthPage?: boolean;
    subtitle?:  React.ReactNode;
    loading?: LoadingState;
    isDelete?: boolean;
}

const FormPopup = ({title, text, buttonText, handleConfirm, children, setShowModal, isAuthPage, subtitle, loading, isDelete = false} : FormPopupProps) => {
  return (
    <div className={isAuthPage ? 'flex-1 flex justify-center mt-[60px] lg:mt-0' : `fixed w-full h-full top-0 left-0 bottom-0 flex justify-center items-center z-40`}>
        <Card className="max-w-[600px] w-full relative z-20" $width="90%">
            <div className="flex justify-between items-center">
                <HeaderPreset1>{title}</HeaderPreset1>
                {setShowModal &&
                <button onClick={() => setShowModal(false)}><CloseModalIcon/></button>}
            </div>
            <p className="mb-2">{text || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo voluptas consequuntur labore, odit architecto quas voluptatem magnam reprehenderit.'} </p>
            <form className="flex flex-col gap-3" onSubmit={handleConfirm}>
              {children}
              <PrimaryButton type="submit" className="mt-2" $delete={isDelete}>
                {loading == 'pending' ? 
                  <l-dot-wave
                  size="47"
                  speed="1"
                  color="white" 
                ></l-dot-wave>
                : buttonText}
              </PrimaryButton>
              {subtitle}
            </form>
        </Card>
        {setShowModal && <div onClick={() => setShowModal(false)} className="bg-grey-900 opacity-65 w-full h-full absolute z-10"></div>}
    </div>
  )
}

export default FormPopup;