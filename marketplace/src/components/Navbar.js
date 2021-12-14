import React from "react";
import { Component } from "react";

import "./App.css"
class _navbar extends Component {

  render() {
    return (
        <div className = "navbar">
        <button className = "nvButton">
            Real Estate Marketplace
        </button>
        <button className = "nvButton">
            Acc No: {this.props.account}
        </button>
    
    </div>
    );
  }
}

export default _navbar;
