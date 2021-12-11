import './css/style.css';
import {useNavigate} from "react-router-dom";
function _roleSel() {
 let navigate = useNavigate()
  return (
    <div>
        <div className="banner">
          <p>Welcome X</p>
      </div><div id="roleSelect">
              <button id="seller" onClick={()=>{navigate("/sellerDashboard")}}>
                  <p>Continue As a Seller!</p>
              </button>
              <button id="buyer" onClick={()=>{navigate("/buyerDashboard")}}>
                  <p>Continue As a Buyer</p>
              </button>
          </div>
    </div>
    

  );
}

export default _roleSel;
