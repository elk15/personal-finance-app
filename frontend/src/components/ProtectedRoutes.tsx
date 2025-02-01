import { Navigate, Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './hooks/hooks'
import { setUser } from '../reducers/userReducer'

const ProtectedRoute = () => {
  const { userToken } = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()

  if (!userToken) {
    const userJSON = window.localStorage.getItem('loggedFinanceUser')
    if (!userJSON) {
        return <Navigate to="/login" replace />
    }
    const data = JSON.parse(userJSON)
    dispatch(setUser(data))
  }

  return <Outlet />
}

export default ProtectedRoute