import React from "react";
import { Component } from "react";
import "./App.css";
import { Link } from "react-router-dom";

class _form extends Component {
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
            const rent = window.web3.utils.toWei(
              this.rent.value.toString(),
              "Ether"
            );
            const sale = window.web3.utils.toWei(
              this.sale.value.toString(),
              "Ether"
            );
            this.props.createListing(title, desc, addr, pc, rent, sale);
          }}
        >
          <div className="form-group mr-lg">
            <p className="cardHeading">Add Property</p>
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
          <div className="form-group mr-sm-2">
            <input
              id="propertySale"
              type="text"
              className="form-control"
              placeholder="Property Price"
              ref={(input) => {
                this.sale = input;
              }}
              required
            />
          </div>
          <div className="buttons">
            <button className="submitButton" type="submit">
              Add Property to Blockchain
            </button>
            <p></p>
            <button className="submitButton" id="sb">
              {" "}
              <Link to={`/propListings`}>See Listings</Link>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default _form;
