import { useState } from "react";
import OverviewIcon from '../assets/images/icon-nav-overview.svg?react'
import TransactionsIcon from '../assets/images/icon-nav-transactions.svg?react'
import BudgetsIcon from '../assets/images/icon-nav-budgets.svg?react'
import PotsIcon from '../assets/images/icon-nav-pots.svg?react'
import BillsIcon from '../assets/images/icon-nav-recurring-bills.svg?react'
import MinimizeMenuIcon from '../assets/images/icon-minimize-menu.svg?react'
import LogoLarge from '../assets/images/logo-large.svg?react'
import { Link } from "react-router-dom";


const NavBar = () => {
    const [isExpanded, setIsExpanded] = useState<boolean>(true); 
    const highlightedNavItemClasses = 'bg-beige-100 border-l-2 border-green';

    return (
      <nav className={`bg-grey-900 p-5 pl-0 rounded-r-3xl text-grey-300 ${isExpanded ? 'w-[300px]' : 'w-[60px]'}
       h-full fixed z-10 top-0 left-0`}>
        <LogoLarge className="ml-6 mb-12 mt-5"/>
        <ul className="flex flex-col gap-3 font-semibold">
            <Link to="/" className="flex gap-6 items-center p-3 pl-6  rounded-r-xl cursor-pointer navItem"><OverviewIcon className="fill-grey-300 mb-[3px]"/> Overview</Link>
            <Link to="/transactions" className="flex gap-6 items-center p-3 pl-6  rounded-r-xl cursor-pointer navItem"><TransactionsIcon className="fill-grey-300"/> Transactions</Link>
            <Link to="/budgets" className="flex gap-6 items-center p-3 pl-6  rounded-r-xl cursor-pointer navItem"><BudgetsIcon className="fill-grey-300"/> Budgets</Link>
            <Link to="/pots" className="flex gap-6 items-center p-3 pl-6  rounded-r-xl cursor-pointer navItem"><PotsIcon className="fill-grey-300"/> Pots</Link>
            <Link to="/recurring-bills" className="flex gap-6 items-center p-3 pl-6  rounded-r-xl cursor-pointer navItem"><BillsIcon className="fill-grey-300"/> Recurring Bills</Link>
        </ul>

        <button className="flex items-center gap-6 pl-6 font-semibold absolute bottom-[60px]" id="minimizeSidebarBtn">
            <MinimizeMenuIcon className="fill-grey-300"/>
            <span>Minimize Menu</span>
        </button>
      </nav>
    )
  }
  
  export default NavBar;