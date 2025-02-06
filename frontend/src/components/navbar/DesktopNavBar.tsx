import { useState } from "react";
import OverviewIcon from '../../assets/images/icon-nav-overview.svg?react'
import TransactionsIcon from '../../assets/images/icon-nav-transactions.svg?react'
import BudgetsIcon from '../../assets/images/icon-nav-budgets.svg?react'
import PotsIcon from '../../assets/images/icon-nav-pots.svg?react'
import BillsIcon from '../../assets/images/icon-nav-recurring-bills.svg?react'
import MinimizeMenuIcon from '../../assets/images/icon-minimize-menu.svg?react'
import LogoLarge from '../../assets/images/logo-large.svg?react'
import LogoSmall from '../../assets/images/logo-small.svg?react'
import { NavLink } from "react-router-dom";

const DesktopNavBar = ()=> {
    const [isExpanded, setIsExpanded] = useState<boolean>(true); 
    const navLinkClasses = `p-3  pl-6 border-l-4 border-transparent ${isExpanded ? 'min-w-[210px]' : 'delay-300 w-[75px] collapsed'} 
    rounded-r-xl cursor-pointer navItem h-[48px] overflow-hidden whitespace-nowrap transition-[width] duration-300 ease-out`
    const nanLinkTextClasses = `transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 invisible'} relative top-[1px]`

    return (
      <nav className={`bg-grey-900 pl-0 rounded-r-3xl text-grey-300 ${isExpanded ? 'w-[260px] p-5' : 'w-[80px] pt-5 pb-6 collapsed'}
       h-full fixed z-10 top-0 left-0 transition-[width] duration-300 ease-out overflow-hidden group`}>
        {isExpanded ?
          <LogoLarge className="ml-7 mb-12 mt-5"/>
          : <LogoSmall className="mb-12 mt-5 ml-[2rem]"/>
        }
        <div className="flex flex-col gap-3 font-semibold">
            <NavLink to="/" className={navLinkClasses}>
              <OverviewIcon className="fill-grey-300 mb-[3px] mr-6 inline-block"/> 
              <span className={nanLinkTextClasses}>Overview</span>
            </NavLink>
            <NavLink to="/transactions" className={navLinkClasses}>
              <TransactionsIcon className="fill-grey-300 mr-6 inline-block"/> 
              <span className={nanLinkTextClasses}>Transactions</span>
            </NavLink>
            <NavLink to="/budgets" className={navLinkClasses}>
              <BudgetsIcon className="fill-grey-300 mr-6 inline-block"/> 
              <span className={nanLinkTextClasses}>Budgets</span>
            </NavLink>
            <NavLink to="/pots" className={navLinkClasses}>
              <PotsIcon className="fill-grey-300 mr-6 inline-block"/> 
              <span className={nanLinkTextClasses}>Pots</span>
            </NavLink>
            <NavLink to="/bills" className={navLinkClasses}>
              <BillsIcon className="fill-grey-300 mr-6 inline-block"/> 
              <span className={nanLinkTextClasses}>Recurring Bills</span>
            </NavLink>
        </div>

        <button className="flex items-center gap-6 pl-7 font-semibold absolute bottom-[60px]" id="minimizeSidebarBtn" onClick={() => setIsExpanded(!isExpanded)}>
            <MinimizeMenuIcon className={`fill-grey-300 ${!isExpanded ? 'rotate-180 relative left-5' : ''} transition-transform duration-300 origin-left`}/>
            {isExpanded && <span>Minimize Menu</span>} 
        </button>
      </nav>
    )
  }
  
  export default DesktopNavBar;