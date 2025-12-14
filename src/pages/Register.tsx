import FormPopup from '../components/FormPopup'
import { FormEvent, useEffect, useState } from 'react'
import TextInput from '../components/TextInput'
import { Link, useNavigate } from 'react-router-dom'
import AuthPageTemplate from '../components/AuthPageTemplate'
import { ErrorText } from '../styled-components'
import { useAuth } from '../contexts/AuthContext'

const Register = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const {user, loading, signUp} = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        if (!loading && user) {
            navigate('/')  
        } 
    },[loading, navigate, user])

    const createAccount = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)
        try {
            await signUp(email, password)
        } catch(err) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('Failed to sign up.')
            }
        }
    }

    return (
        <AuthPageTemplate>
            <FormPopup title='Sign Up' text=' ' buttonText='Create Account' handleConfirm={createAccount} isAuthPage={true} loading={loading ? 'pending' : 'idle'}
            subtitle={
              <div className='flex items-center justify-center gap-1'>
                  <p>Already have an account?</p><span className='text-black underline font-bold text-[14px]'><Link to={'/login'}>Login</Link></span>
              </div>
            }
            >
                <TextInput 
                    label="Email" 
                    placeholder=" "
                    type="email" id="email"
                    value={email} setValue={e => setEmail(e.currentTarget.value)}
                    maxLength={100}
                    />
                <TextInput 
                    label="Create Password" 
                    placeholder=" "
                    type="password" id="password" isRegister={true}
                    value={password} setValue={e => setPassword(e.currentTarget.value)}
                    maxLength={100}
                    minLength={8}
                    />
                {error && <ErrorText>{error}</ErrorText>}
            </FormPopup>
        </AuthPageTemplate>
    )
  }
  
export default Register