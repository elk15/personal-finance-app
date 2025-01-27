import Logo from '../assets/images/logo-large.svg?react'
import { HeaderPreset1 } from '../styled-components'

interface AuthPageTemplateProps {
    children: React.ReactNode;
}

const AuthPageTemplate = ({children}:AuthPageTemplateProps) => {

    return (
    <div className="flex items-center gap-[104px] relative">
        <div className='authImg flex-1 rounded-xl relative lg:block hidden'>
            <Logo className='absolute top-10 left-10'/>
            <div className='absolute w-[450px] bottom-10 left-10'>
                <HeaderPreset1 className='text-white'>Keep track of your money and save for your future</HeaderPreset1>
                <p className='text-white mt-4'>
                    Personal finance app puts you in control of your spending. Track transactions, set budgets, and add to savings pots easily.
                </p>
            </div>
        </div>
        <div className='lg:hidden block bg-grey-900 absolute top-[-36px] p-4 py-5 w-screen left-[-28px] rounded-b-lg'>
            <Logo className='mx-auto'/>
        </div>
        {children}
    </div>
    )
  }
  
export default AuthPageTemplate