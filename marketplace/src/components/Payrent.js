import React from "react";
import { useState } from "react";
import "./App.css"
import { useLocation } from 'react-router-dom'

 function _pay_r({payrent})   {
    const [months,setMonth] = useState("")
    const loc = useLocation()
    const {price}  = loc.state
 
    return (
      <div id="content">
        
        <form
        className="formClass"
          onSubmit={(event) => {
            event.preventDefault();
            
            // this.props.rentInit(bTime);
            console.log(price);
            payrent(months.value.toString(), price);
            console.log(payrent)
          }}
        >
          
          <div className="form-group mr-lg">
          <p className="cardHeading" >Add Property to Rent</p>
            <input
              id="months"
              type="text"
              className="form-control"
              placeholder="Enter the number of Months"
              ref={(input) => {
                setMonth(input);
              }}
              required
            />
          </div>
 

          <div className = "buttons">
          <button className = "submitButton" type="submit" >
            Pay rent
          </button>

          
          </div>
        </form>
        
      </div>
    );
  
}

export default _pay_r;
