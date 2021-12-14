import React from "react";
import { Component } from "react";
import { useNavigate } from "react-router-dom";

import "./Card.css";
function _home() {
  let nav = useNavigate();
  return (
    <div className="containerHome">
      <div>
        <button
          className="roleButton"
          onClick={(event) => {
            nav("/rentDetails");
          }}
        >
          <div className="Title">List Property For Rent</div>
        </button>
      </div>
      <div>
        <button
          className="roleButton"
          onClick={(event) => {
            nav("/saleDetails");
          }}
        >
          <div className="Title">List Property For Sale</div>
        </button>
      </div>
      <div>
        <button
          className="roleButton"
          onClick={(event) => {
            nav("/propListings");
          }}
        >
          <div className="Title">Buy Property for Sale</div>
        </button>
      </div>
      <div>
        <button
          className="roleButton"
          onClick={(event) => {
            nav("/rentListings");
          }}
        >
          <div className="Title">Rent Property</div>
        </button>
      </div>
    </div>
  );
}

export default _home;
