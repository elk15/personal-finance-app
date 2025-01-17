import GlobalFont from "./globalFont"
import NavBar from "./components/NavBar"
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'
import Overview from "./pages/Overview"

function App() {
  
  return (
    <Router>
      <GlobalFont />
      <NavBar/>    
      <Routes>
        <Route path="/" element={<Overview/>}/>
        <Route path="/transactions"/>
        <Route path="/budgets"/>
        <Route path="/pots"/>
        <Route path="/recurring-bills"/>
      </Routes>
    </Router>
  )
}

export default App
