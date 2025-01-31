import COLORS from "../../statics/colours";
import { Pot } from "../../types";

interface SavingProgressBarProps {
    pot: Pot;
    title?: string;
    showNewAmount?: boolean;
    isWithdraw?: boolean;
    newAmount?: number;
}

const SavingProgressBar = ({pot, title = 'Total Saved', showNewAmount, isWithdraw, newAmount=0} : SavingProgressBarProps) => {
    const {totalSaved, target, theme} = pot
    let secondBarStyle = {}
    let secondPercentage = 0;
    let totalPercentage = 0;
    let totalPercentageStyle = {}
    let total = totalSaved;


    let firstPercentage = totalSaved*100/target

    if (showNewAmount) {
        secondPercentage = newAmount*100/target
        totalPercentage = isWithdraw ? firstPercentage - secondPercentage : firstPercentage + secondPercentage
        total = totalSaved + newAmount

        if (isWithdraw) {
            firstPercentage = totalPercentage
            total = totalSaved - newAmount
        }

        secondBarStyle = {
            backgroundColor: isWithdraw ? COLORS.red : COLORS.green,
            width: `${secondPercentage.toFixed(2)}%`,
            left: `${(firstPercentage + 0.25).toFixed(2)}%`,
        }

        totalPercentageStyle = {
            color: isWithdraw ? COLORS.red : COLORS.green
        }
    }

    const firstBarStyle = { 
        backgroundColor: showNewAmount ? COLORS['grey-900'] : COLORS[theme],
        width: `${firstPercentage.toFixed(2)}%`
    }

  return (
    <div className="flex flex-col gap-3 mb-3">
        <div className="flex items-center justify-between">
            <p>{title}</p>
            <span className="font-bold sm:text-[2rem] text-[1.5rem]">${total.toFixed(2)}</span>
        </div>
        <div className="w-full bg-beige-100 h-[8px] rounded-lg">
            <div style={firstBarStyle} className={`h-[8px] rounded-lg ${showNewAmount ? 'rounded-r-none' : ''}`}></div>
            {showNewAmount && <div style={secondBarStyle} className={`h-[8px] rounded-lg ${(total > 0) ? 'rounded-l-none' : ''} relative bottom-2`}></div>}
        </div>
        <div className="flex items-center justify-between">
            <p className="font-bold" style={totalPercentageStyle}>{showNewAmount ? totalPercentage.toFixed(2) : firstPercentage.toFixed(2)}%</p>
            <p>Target of ${target.toLocaleString()}</p>
        </div>
    </div>
  )
}

export default SavingProgressBar;