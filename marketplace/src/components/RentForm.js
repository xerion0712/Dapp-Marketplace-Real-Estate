import React from "react";
import { Component } from "react";
import "./App.css"
import {Link} from "react-router-dom";

class _rform extends Component {

  render() {
    return (
      <div id="content">
        
        <form
        className="formClass"
          onSubmit={(event) => {
            event.preventDefault();
            const title = this.title.value;
            const desc = this.desc.value;
            const addr = this.addr.value;
            const pc = this.pc.value;
            const rent = window.web3.utils.toWei(this.rent.value.toString(), 'Ether');
            const sale  = window.web3.utils.toWei("0", 'Ether');
            const bTime = this.bTime.value.toString();
            this.props.createListing(title,desc,addr,pc,rent,sale,bTime, this.rAdv.value.toString());
            // this.props.rentInit(bTime);
          }}
        >
          
          <div className="form-group mr-lg">
          <p className="cardHeading" >Add Property to Rent</p>
            <input
              id="propertyTitle"
              type="text"
              className="form-control"
              placeholder="Title"
              ref={(input) => {
                this.title = input;
              }}
              required
            />
          </div>
          <div className="form-group mr-lg">
            <input
              id="propertyDesc"
              type="text"
              className="form-control"
              placeholder="Description of property"
              ref={(input) => {
                this.desc = input;
              }}
              required
            />
          </div>
          <div className="form-group mr-lg">
            <input
              id="propertyAddr"
              type="text"
              className="form-control"
              placeholder="Address"
              ref={(input) => {
                this.addr = input;
              }}
              required
            />
          </div>
          <div className="form-group mr-lg">
            <input
              id="propertyCode"
              type="text"
              className="form-control"
              placeholder="Pincode"
              ref={(input) => {
                this.pc = input;
              }}
              required
            />
          </div>
          <div className="form-group mr-lg">
            <input
              id="propertyRent"
              type="text"
              className="form-control"
              placeholder="Price for Renting per month"
              ref={(input) => {
                this.rent = input;
              }}
              default="0"
              required
            />
          </div>
          <div className="form-group mr-lg">
            <input
              id="bTime"
              type="text"
              className="form-control"
              placeholder="Avg BlockTime"
              ref={(input) => {
                this.bTime = input;
              }}
              default="1"
              
            />
          </div>
          <div className="form-group mr-lg">
            <input
              id="rAdv"
              type="text"
              className="form-control"
              placeholder="Advance Rent to be collected"
              ref={(input) => {
                this.rAdv = input;
              }}
              default="0"
              required
            />
          </div>

          <div className = "buttons">
          <button className = "submitButton" type="submit" >
            Add Property to Blockchain
          </button>
          <p></p>
          <button className = "submitButton" id = "sb"> <Link to={`/listings`}>See Listings</Link></button>
          </div>
        </form>
        
      </div>
    );
  }
}

export default _rform;
