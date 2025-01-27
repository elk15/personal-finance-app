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

function App() {
  
  return (
    <Router>
      <GlobalFont />
      <NavBar/>    
      <Routes>
        <Route path="/" element={<Overview/>}/>
        <Route path="/transactions"/>
        <Route path="/budgets"/>
        <Route path="/pots" element={<Pots/>}/>
        <Route path="/recurring-bills"/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </Router>
  )
}

export default App
