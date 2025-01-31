import GlobalFont from "./globalFont"
import NavBar from "./components/NavBar"
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'
import Overview from "./pages/Overview"
import Pots from "./pages/Pots"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProtectedRoute from "./components/ProtectedRoutes"
import { useEffect } from "react"
import { initializePots } from "./reducers/potReducer"
import { useAppDispatch, useAppSelector } from "./hooks"
import { getAuthHeader } from "./utils"
import { dotWave } from 'ldrs'
dotWave.register()

function App() {
  const dispatch = useAppDispatch()
  const { userToken } = useAppSelector((state) => state.user)
  
  useEffect(() => {
    const fetchData = async () => {
      if (userToken) {
        const config = getAuthHeader(userToken)

        await Promise.all([
          dispatch(initializePots(config)),
        ]) 
      }
    }
    fetchData()
  }, [dispatch, userToken])
  
  return (
    <Router>
      <GlobalFont />
      <NavBar/>    
      <Routes>
        <Route element={<ProtectedRoute/>}>
          <Route path="/" element={<Overview/>}/>
          <Route path="/transactions"/>
          <Route path="/budgets"/>
          <Route path="/pots" element={<Pots/>}/>
          <Route path="/recurring-bills"/>
        </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </Router>
  )
}

export default App
