import GlobalFont from "./globalFont"
import NavBar from "./components/NavBar"
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'
import Overview from "./pages/Overview"
import Pots from "./pages/Pots"

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
      </Routes>
    </Router>
  )
}

export default App
