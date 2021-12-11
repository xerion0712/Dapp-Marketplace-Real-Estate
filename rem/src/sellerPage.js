import './css/style.css';
import {useNavigate} from "react-router-dom";
function _sellerDashboard() {
 let navigate = useNavigate()
  return (
    <div>
        <div className = "banner">
       <p>Welcome X</p> 
    </div>

    <p className="listings">Your Listings</p>
    <div className = "listings">
        
        <button>
            <div className = "imgListing">

            </div>
            <div className = "infoListing">
                
                
            </div>
        </button>
        <button>
            <div className = "imgListing">

            </div>
            <div className = "infoListing">

            </div>
        </button>
    </div>
    </div>
    

  );
}

export default _sellerDashboard;
