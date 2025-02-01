import GlobalFont from "./globalFont"
import NavBar from "./components/navbar/NavBar"
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'
import Overview from "./pages/Overview"
import Pots from "./pages/Pots"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProtectedRoute from "./components/ProtectedRoutes"
import { useEffect, useRef, useState } from "react"
import { initializePots } from "./reducers/potReducer"
import { useAppDispatch, useAppSelector } from "./components/hooks/hooks"
import { getAuthHeader } from "./utils"
import { dotWave } from 'ldrs'
import useScreenWidth from "./components/hooks/useScreenWidth"
dotWave.register()

function App() {
  const dispatch = useAppDispatch()
  const { userToken } = useAppSelector((state) => state.user)
  const [isWideScreen, setIsWideScreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const screenWidth = useScreenWidth()    
  const maxContentWidth = 1400
  const sidebarWidth = 260
  
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

  useEffect(() => {
    const checkScreenSize = () => {
      // Calculate if screen can fit both sidebar and max content width
      const canFitBoth =screenWidth >= (sidebarWidth + maxContentWidth) + (screenWidth - maxContentWidth)/2;
      setIsWideScreen(canFitBoth);
    };

    // Initial check
    checkScreenSize();

    // Add resize listener
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, [screenWidth]);
  
  return (
    <Router>
      <GlobalFont />
      {userToken && <NavBar/>}
      <main ref={containerRef} className="flex flex-col gap-5 w-[calc(100%-160px)]" style={{
        marginLeft: (!isWideScreen && screenWidth > 1024) ? `${sidebarWidth}px` : 'auto',
        marginRight: 'auto'
      }}>
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
      </main>
    </Router>
  )
}

export default App
