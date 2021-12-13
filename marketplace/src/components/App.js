import React, { Component } from "react";
import { useState, useEffect } from "react";
import "./App.css";
import Web3 from "web3";
import Marketplace from "../abis/Marketplace.json"

function App() {
  const [account, setAccount] = useState("");
  const [listings, getListings] = useState([]);
  const [countListings, getCount] = useState(0);
  const [loading, setloading] = useState(true);
  const [contract,setContract] = useState();

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
    }
  }
 
  async function loadBlockchainData() {
    const _web3 = window.web3;

    const acc = await _web3.eth.getAccounts();

    setAccount(acc);
    const networkId = await _web3.eth.net.getId()
    // console.log(networkId);
    const networkData = Marketplace.networks[networkId]
    if(networkData) {
      const contractM = (_web3.eth.Contract(Marketplace.abi,networkData.address))
      // console.log(contractM)
      setContract(contractM);
    }
    else{
      window.alert("not deployed")
    }
    
  }
  async function load() {
    await loadWeb3();
    await loadBlockchainData();
    
  }
  
  useEffect(() => {
    load();
  },[contract]);
  

  return (
    <div>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <p
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          // rel="noopener noreferrer"
        >
          Real Estate Maketplace
        </p>
        <p className="navbar-brand col-sm-10">{account}</p>
      </nav>

    </div>
  );
}

export default App;
