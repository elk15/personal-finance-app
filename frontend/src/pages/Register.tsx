import FormPopup from '../components/FormPopup'
import { useState } from 'react'
import TextInput from '../components/TextInput'
import { Link } from 'react-router-dom'
import AuthPageTemplate from '../components/AuthPageTemplate'

const Register = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const handleAuth = () => {

    }

    return (
        <AuthPageTemplate>
            <FormPopup title='Sign Up' text=' ' buttonText='Create Account' handleConfirm={handleAuth} isAuthPage={true}
            subtitle={
              <div className='flex items-center justify-center gap-1'>
                  <p>Already have an account?</p><span className='text-black underline font-bold text-[14px]'><Link to={'/login'}>Login</Link></span>
              </div>
            }
            >
                <TextInput 
                    label="Name" 
                    placeholder=" "
                    type="text" id="name"
                    value={name} setValue={e => setName(e.currentTarget.value)}/>
                <TextInput 
                    label="Email" 
                    placeholder=" "
                    type="email" id="email"
                    value={email} setValue={e => setEmail(e.currentTarget.value)}/>
                <TextInput 
                    label="Create Password" 
                    placeholder=" "
                    type="password" id="password" isRegister={true}
                    value={password} setValue={e => setPassword(e.currentTarget.value)}/>
            </FormPopup>
        </AuthPageTemplate>
    )
  }
  
export default Register