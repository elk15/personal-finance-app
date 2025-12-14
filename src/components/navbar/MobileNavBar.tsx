import OverviewIcon from '../../assets/images/icon-nav-overview.svg?react'
import TransactionsIcon from '../../assets/images/icon-nav-transactions.svg?react'
import BudgetsIcon from '../../assets/images/icon-nav-budgets.svg?react'
import PotsIcon from '../../assets/images/icon-nav-pots.svg?react'
import BillsIcon from '../../assets/images/icon-nav-recurring-bills.svg?react'
import { NavLink } from "react-router-dom";

const MobileNavBar = () => {
    const navLinkClasses = `flex flex-col items-center gap-2 flex-1 navItem pt-3 sm:pb-1 pb-3 mx-3 
    rounded-t-xl border-b-4 border-transparent`
    

    return (
      <nav className="bg-grey-900 pl-0 rounded-t-xl text-grey-300 w-[99vw] fixed z-20 bottom-0 left-0 sm:h-[80px] h-[57px]">
        <div className="flex items-end h-full">
            <NavLink to={"/"} className={navLinkClasses}>
                <OverviewIcon className="fill-grey-300"/>
                <span className="font-bold text-sm hidden sm:block">Overview</span>
            </NavLink>
            <NavLink to={"/transactions"} className={navLinkClasses}>
                <TransactionsIcon className="fill-grey-300"/>
                <span className="font-bold text-sm hidden sm:block">Transactions</span>
            </NavLink>
            <NavLink to={"/budgets"} className={navLinkClasses}>
                <BudgetsIcon className="fill-grey-300"/>
                <span className="font-bold text-sm hidden sm:block">Budgets</span>
            </NavLink>
            <NavLink to={"/pots"} className={navLinkClasses}>
                <PotsIcon className="fill-grey-300"/>
                <span className="font-bold text-sm hidden sm:block">Pots</span>
            </NavLink>
            <NavLink to={"/bills"} className={navLinkClasses}>
                <BillsIcon className="fill-grey-300"/>
                <span className="font-bold text-sm hidden sm:block">Recurring Bills</span>
            </NavLink>
        </div>
      </nav>
    )
  }
  
  export default MobileNavBar;