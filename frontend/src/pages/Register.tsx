import FormPopup from '../components/FormPopup'
import { FormEvent, useEffect, useState } from 'react'
import TextInput from '../components/TextInput'
import { Link, useNavigate } from 'react-router-dom'
import AuthPageTemplate from '../components/AuthPageTemplate'
import { setUser } from '../reducers/userReducer'
import { useAppDispatch, useAppSelector } from '../components/hooks/hooks'
import userServices from '../services/users'
import { AxiosError } from 'axios'
import { ErrorText } from '../styled-components'
import { LoadingState } from '../types'

const Register = () => {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<LoadingState>('idle')
    const dispatch = useAppDispatch()
    const { userToken } = useAppSelector((state) => state.user)
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

    const createAccount = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try {
        setLoading('pending')
        await userServices.register({email, name, password})
        setLoading('succeeded')
        setError(null)
        navigate('/login')
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
            let errorMessage = error.response?.data
            if (typeof errorMessage === 'object') {
                errorMessage = errorMessage?.error
            }
            setError(errorMessage)
        } else {
            setError('An unexpected error occurred')
        }
      }

    }

    return (
        <AuthPageTemplate>
            <FormPopup title='Sign Up' text=' ' buttonText='Create Account' handleConfirm={createAccount} isAuthPage={true} loading={loading}
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
                    value={name} setValue={e => setName(e.currentTarget.value)}
                    maxLength={30}
                    />
                <TextInput 
                    label="Email" 
                    placeholder=" "
                    type="email" id="email"
                    value={email} setValue={e => setEmail(e.currentTarget.value)}
                    maxLength={30}
                    />
                <TextInput 
                    label="Create Password" 
                    placeholder=" "
                    type="password" id="password" isRegister={true}
                    value={password} setValue={e => setPassword(e.currentTarget.value)}
                    maxLength={30}
                    minLength={8}
                    />
                {error && <ErrorText>{error}</ErrorText>}
            </FormPopup>
        </AuthPageTemplate>
    )
  }
  
export default Register