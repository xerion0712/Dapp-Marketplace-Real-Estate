/* eslint-disable react/jsx-pascal-case */
import React, { Component } from "react";


import Web3 from "web3";
import Marketplace from "../abis/Marketplace.json";
import Renting_System from "../abis/Renting_System.json";
import _form from "./Form";
import _rform from "./RentForm";
import _navbar from "./Navbar";
import _card from "./Card";
import _rcard from "./RentListings";
import _tform from "./tenentForm";
import _pay_r from "./Payrent";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

class App extends Component {
  // const [account, setAccount] = useState("");
  // const [listings, getListings] = useState([]);
  // const [countListings, getCount] = useState(0);
  // const [loading, setloading] = useState(true);
  // const [contract,setContract] = useState();
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      listings: [],
      countListings: "",
      loading: false,
      contract: "",
      rent_contract: "",
      tenant: ""
    };
    this.setTenant = this.setTenant.bind(this);
    this.createListing = this.createListing.bind(this);
    this.purchaceProperty = this.purchaceProperty.bind(this);
    this.rentSet = this.rentSet.bind(this);
    this.payrent = this.payrent.bind(this);
  }
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
    }
  }

  async loadBlockchainData() {
    const _web3 = window.web3;

    const acc = await _web3.eth.getAccounts();

    this.setState({ account: acc[0] });
    const networkId = await _web3.eth.net.getId();
    
    const networkData = Marketplace.networks[networkId];
    const networkData_Rent = Renting_System.networks[networkId];
    

    if (networkData && networkData_Rent) {
      const contractM = new _web3.eth.Contract(
        Marketplace.abi,
        networkData.address
      );

      const contractR = new _web3.eth.Contract(
        Renting_System.abi,
        networkData_Rent.address
      );

      this.setState({ contract: contractM });
      this.setState({ rent_contract: contractR });
      

      const v =  await this.state.rent_contract.methods.getTenant().call()
      this.setState({tenant: v});
      const countListings = await contractM.methods.countListings().call();
      this.setState({ countListings: countListings });
      for (var i = 1; i <= countListings; i++) {
        const property = await contractM.methods.listings(i).call();
        
        this.setState({
          listings: this.state.listings.concat(property),
        });
      }
      
    } else {
      window.alert("not deployed");
    }
  }

  rentInit(bTime,rent,advance){
    this.state.rent_contract.methods
    .initiate(bTime,rent,advance)
    .send({ from: this.state.account })
    .once("receipt", (receipt) => {
      this.state.loading = false;
    });
  }

  setTenant(addr){
    this.state.rent_contract.methods
    .addTenant(addr)
    .send({ from: this.state.account })
    .once("receipt", (receipt) => {
      this.state.loading = false;
    });
  }

  createListing(title, desc, addr, pc, rPrice, sPrice, bTime, advance) {
    let forRent = false;
    let forSale = true;
    
    if (rPrice > 0 && bTime>0) {
      forRent = true;
      this.rentInit(bTime,rPrice, advance)
    }
    if (sPrice > 0) {
      forSale = true;

    }
    // sPrice = Number(sPrice);
    // rPrice = Number(rPrice);
     this.state.contract.methods
      .createListing(title, desc, addr, pc, forSale, forRent, rPrice, sPrice)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.state.loading = false;
      });

      
    
  }

  purchaceProperty(id, price) {
    this.setState({ loading: true });
    this.state.contract.methods
      .purchaceProperty(id)
      .send({ from: this.state.account, value: price })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
      });
  }
  rentSet(id, addr) {
    this.setState({ loading: true });
    this.state.contract.methods
      .rentProperty(id,addr)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
      });
  }
  payrent(months,price){
    this.state.rent_contract.methods.payRent(months).send({from : this.state.account, value : window.web3.utils.toWei(price.toString(), 'Ether')}).once("receipt", (receipt) => {this.state.loading = true})
  }

  render() {
    return (
      <Router>
        <_navbar account={this.state.account} />
        <Routes>
          <Route
            path="/"
            element={
              <_rform
                listings={this.state.listings}
                createListing={this.createListing}
                purchaceProperty={this.purchaceProperty}
                rentInit = {this.rentInit}
              />
            }
          />
          <Route
            path="/listings"
            element={
              <_rcard
                listings={this.state.listings}
                purchaceProperty={this.purchaceProperty}
                contract = {this.state.rent_contract}
                account = {this.state.account}
                tenant = {this.state.tenant}
              />
            }
          />
          <Route
            path="/settenant"
            element={
              <_tform
                setTenant = {this.setTenant}
              />
            }
          />
          <Route
            path="/payrent"
            element={
              <_pay_r
                payrent = {this.payrent}
              />
            }
          />
        </Routes>
      </Router>
    );
  }
}

export default App;
