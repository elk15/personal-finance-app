import FormPopup from '../components/FormPopup'
import { ErrorText, PrimaryButton } from '../styled-components'
import { FormEvent, useEffect, useState } from 'react'
import TextInput from '../components/TextInput'
import { Link, useNavigate } from 'react-router-dom'
import AuthPageTemplate from '../components/AuthPageTemplate'
import { loginUser, setUser } from '../reducers/userReducer'
import { useAppDispatch, useAppSelector } from '../hooks'

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const dispatch = useAppDispatch()
    const { userToken, error } = useAppSelector((state) => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (userToken) {
            navigate('/')
            
        } else {
            const userJSON = window.localStorage.getItem('loggedFinanceUser')
            if (userJSON) {
                const data = JSON.parse(userJSON)
                dispatch(setUser(data))
                navigate('/')
            }
        }
    },[dispatch, navigate, userToken])

    const handleAuth = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(loginUser({email, password}, navigate))
    }

    const loginAsGuest = () => {
        dispatch(loginUser({
            email: import.meta.env.VITE_GUEST_EMAIL, 
            password: import.meta.env.VITE_GUEST_PASSWORD
        }, navigate))
    }

    return (
        <AuthPageTemplate>
            <FormPopup title='Login' text=' ' buttonText='Login' handleConfirm={handleAuth} isAuthPage={true}
            subtitle={
            <div className='flex flex-col mt-1 gap-6'>
                <PrimaryButton type='button' onClick={loginAsGuest}>Login as Guest</PrimaryButton>
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
                    type="password" id="password" minLength={8}
                    value={password} setValue={e => setPassword(e.currentTarget.value)}/>
                {error && <ErrorText>{error}</ErrorText>}
            </FormPopup>
        </AuthPageTemplate>
    )
  }
  
export default Login