import { getOrdinalSuffix } from "../../utils"
import DueIcon from '../../assets/images/icon-bill-due.svg?react'
import PaidIcon from '../../assets/images/icon-bill-paid.svg?react'
import CheckedBoxIcon from '../../assets/images/square-check-regular.svg?react'
import useScreenWidth from "../hooks/useScreenWidth"
import { useAppSelector } from "../hooks/hooks"

interface BillItemProps {
    name: string
    dueDate: number
    amount: number
    isPaid?: boolean
    isDueSoon?: boolean
    handlePayBill: (id: string) => void
}

const BillItem = ({ name, dueDate, amount, isPaid, isDueSoon, handlePayBill} : BillItemProps) => {
    const screenWidth = useScreenWidth()    
    const { loadingStatus } = useAppSelector((state) => state.transactions)

  return (
    <div className=" p-2 py-5 border-t flex flex-col sm:flex-row gap-4 sm:gap-0 last:pb-3">
        <div className="flex-[3] flex items-center gap-3 max-w-[420px]">
            <button onClick={() => handlePayBill(name)} title="Pay Bill" className={`w-5 
                ${isPaid ? 'opacity-80 pointer-events-none' : 'pay-bill'}
                ${loadingStatus.createTransaction == 'pending' ? 'pointer-events-none' : ''}
                `}>
                {isPaid && <CheckedBoxIcon className="fill-green"/>}
            </button>
            <p className="font-bold text-grey-900">{name}</p>
        </div>
        {screenWidth > 640 ?
        <>
            <div className={`sm:flex-1 flex items-center justify-start`}>
                <p className={`mr-2 ${isPaid ? 'text-green' : ''}`}>Monthly-{getOrdinalSuffix(dueDate)}</p>
                {isPaid && <PaidIcon/>}
                {isDueSoon && <DueIcon/>}
            </div>
            <div className={`font-bold flex items-center sm:flex-1  justify-end ${isDueSoon ? 'text-red' : ''}`}>
                ${Math.abs(amount).toFixed(2)}
            </div>
        </>
        :
            <div className="flex justify-between">
                <div className={`sm:flex-1 flex items-center justify-start`}>
                    <p className={`mr-2 ${isPaid ? 'text-green' : ''}`}>Monthly-{getOrdinalSuffix(dueDate)}</p>
                    {isPaid && <PaidIcon/>}
                    {isDueSoon && <DueIcon/>}
                </div>
                <div className={`font-bold flex items-center sm:flex-1  justify-end ${isDueSoon ? 'text-red' : ''}`}>
                    ${Math.abs(amount).toFixed(2)}
                </div>
            </div>
        }

    </div>
  )
}

export default BillItem;