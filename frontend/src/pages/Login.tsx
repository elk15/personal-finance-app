import FormPopup from '../components/FormPopup'
import { PrimaryButton } from '../styled-components'
import { useState } from 'react'
import TextInput from '../components/TextInput'
import { Link } from 'react-router-dom'
import AuthPageTemplate from '../components/AuthPageTemplate'

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const handleAuth = () => {

    }

    return (
        <AuthPageTemplate>
            <FormPopup title='Login' text=' ' buttonText='Login' handleConfirm={handleAuth} isAuthPage={true}
            subtitle={
            <div className='flex flex-col mt-1 gap-6'>
                <PrimaryButton>Login as Guest</PrimaryButton>
                <div className='flex items-center justify-center gap-1'>
                    <p>Need to create an account?</p><span className='text-black underline font-bold text-[14px]'><Link to={'/register'}>Sign Up</Link></span>
                </div>
            </div>
            }
            >
                <TextInput 
                    label="Email" 
                    placeholder=" "
                    type="email" id="email"
                    value={email} setValue={e => setEmail(e.currentTarget.value)}/>
                <TextInput 
                    label="Password" 
                    placeholder=" "
                    type="password" id="password"
                    value={password} setValue={e => setPassword(e.currentTarget.value)}/>
            </FormPopup>
        </AuthPageTemplate>
    )
  }
  
export default Login