import FormPopup from '../components/FormPopup'
import { ErrorText, PrimaryButton } from '../styled-components'
import { FormEvent, useEffect, useState } from 'react'
import TextInput from '../components/TextInput'
import { Link, useNavigate } from 'react-router-dom'
import AuthPageTemplate from '../components/AuthPageTemplate'
import { useAuth } from '../contexts/AuthContext'

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const {user, loading, signIn, signInAnonymously} = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        if (!loading && user) {
            navigate('/')
            
        }
    },[navigate, user, loading])

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)
        try {
            await signIn(email, password)
        } catch(err) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('Failed to login. Please check your credentials.')
            }
        }
    }

    const loginAsGuest = async () => {
        setError('');
        try {
            await signInAnonymously();
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Failed to start guest session.');
            }
        }
    }

    return (
        <AuthPageTemplate>
            <FormPopup title='Login' text=' ' buttonText='Login' handleConfirm={handleLogin} isAuthPage={true} loading={loading ? 'pending' : 'idle'}
            subtitle={
            <div className='flex flex-col mt-1 gap-6'>
                <PrimaryButton type='button' onClick={loginAsGuest}>
                    {loading ? 
                        <l-dot-wave
                        size="47"
                        speed="1"
                        color="white" 
                        ></l-dot-wave>
                    : 'Login as Guest'
                    }
                </PrimaryButton>
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
                    maxLength={100}
                    value={email} setValue={e => setEmail(e.currentTarget.value)}/>
                <TextInput 
                    label="Password" 
                    placeholder=" "
                    type="password" id="password" minLength={8}
                    maxLength={100}
                    value={password} setValue={e => setPassword(e.currentTarget.value)}/>
                {error && <ErrorText>{error}</ErrorText>}
            </FormPopup>
        </AuthPageTemplate>
    )
  }
  
export default Login