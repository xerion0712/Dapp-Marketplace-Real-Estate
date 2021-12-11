import "./css/style.css";
import {BrowserRouter as Router, Routes, Route ,useNavigate} from "react-router-dom";
import _roleSel from "./roleSelect";
import _login from "./login";
import _sellerDashboard from "./sellerPage";
import _buyerDashboard from "./buyerPage";
function App() {

  return (

    
    <Router>
      <Routes>
        <Route path="/" element = {<_login />}/>
        <Route path="/roleselect" element = {<_roleSel />} />
        <Route path="/sellerDashboard" element = {<_sellerDashboard />} />
        <Route path="/buyerDashboard" element = {<_buyerDashboard />} />
      </Routes>
    </Router>

  );
}

export default App;
