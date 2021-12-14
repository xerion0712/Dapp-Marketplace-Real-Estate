import React from "react";
import { Component } from "react";
import "./App.css";
import { Link } from "react-router-dom";

class _tform extends Component {
  render() {
    return (
      <div id="content">
        <form
          className="formClass"
          onSubmit={(event) => {
            event.preventDefault();

            const addr = this.addr.value.toString();

            this.props.setTenant(addr);

            // this.props.rentInit(bTime);
          }}
        >
          <div className="form-group mr-lg">
            <p className="cardHeading">Add Tenant</p>
            <input
              id="propertyTitle"
              type="text"
              className="form-control"
              placeholder="Address pf tenant"
              ref={(input) => {
                this.addr = input;
              }}
              required
            />
          </div>

          <div className="buttons">
            <button className="submitButton" type="submit">
              Set Tenant
            </button>
            <p></p>
            <button className="submitButton" id="sb">
              {" "}
              <Link to={`/listings`}>See Listings</Link>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default _tform;
