import React from "react";
import { Component } from "react";

import "./Card.css"
class _card extends Component {

  render() {
      return(
          <div >
              <p className="cardHeading">Property Listings</p>
          <div className="cardBody">
              
      {this.props.listings.map((property,key) =>{
          return(
            <div id={key}>
            <div className="container">

        <div className="details">
            <div className="content">
                <div className="Title">
                    {property.title}
                </div>
                <div className = "Address">
                {property.addrL1}
                </div>
                <p></p>
                <p></p>
                <div className = "Pincode">
                    {property.pincode}
                </div>
                <p></p>
                <p></p>
                <div className = "Description">
                {property.description}
                </div>
                <p></p>
                <p></p>
                <div className = "Pincode">  <b>Owned by: </b> <p>{property.currOwner}</p></div>
                <div className = "Price">{window.web3.utils.fromWei(property.priceForSale.toString(), 'Ether')} Eth</div>
                <button className = "buyNow" name={property.id}
                                value={property.priceForSale}
                                onClick={(event) => {
                                  this.props.purchaceProperty(event.target.name, event.target.value)
                                }}>Buy Property</button>
                
            </div>
        </div>
    </div>
        </div>
          )
      })}
      </div>
      </div>
      );
  }
                //   { this.props.listings.map((property, key) => {
                //     return(
                //       <tr key={key}>
                //         <th scope="row">{property.id.toString()}</th>
                //         <td>{property.title}</td>
                //         <td>{property.description}</td>
                //         <td>{property.addrL1}</td>
                //         <td>{property.pincode}</td>
                //         <td>{window.web3.utils.fromWei(property.priceForRent.toString(), 'Ether')} Eth</td>
                //         <td>{window.web3.utils.fromWei(property.priceForSale.toString(), 'Ether')} Eth</td>
                //         <td>{property.currOwner}</td>
                //         <td>
                //           { 
                //             <button
                //                 name={property.id}
                //                 value={property.priceForSale}
                //                 onClick={(event) => {
                //                   this.props.purchaceProperty(event.target.name, event.target.value)
                //                 }}
                //               >
                //                 Buy
                //               </button>
                //           }
                //           </td>
                //       </tr>
                //     )
                //   })}

  }


export default _card;
