import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import "./Card.css";
class _rcard extends Component {
  render() {
    return (
      <div>
        <p className="cardHeading">Property Listings</p>
        <div className="cardBody">
          {this.props.listings.map((property, key) => {
            if (property.priceForRent > 0) {
              return (
                <div id={key}>
                  <div className="container">
                    <div className="details">
                      <div className="content">
                        <div className="Title">{property.title}</div>
                        <div className="Address">{property.addrL1}</div>
                        <p></p>
                        <p></p>
                        <div className="Pincode">{property.pincode}</div>
                        <p></p>
                        <p></p>
                        <div className="Description">
                          {property.description}
                        </div>
                        <p></p>
                        <p></p>
                        <div className="Pincode">
                          {" "}
                          <b>Owned by: </b> <p>{property.currOwner}</p>
                        </div>
                        <div className="Price">
                          {window.web3.utils.fromWei(
                            property.priceForRent.toString(),
                            "Ether"
                          )}{" "}
                          Eth/Month
                        </div>

                        <div>
                          {this.props.tenant == this.props.account ? (
                            <button className="buyNow">
                              <Link
                                to={`/payrent`}
                                state={{
                                  price: window.web3.utils.fromWei(
                                    property.priceForRent.toString(),
                                    "Ether"
                                  ),
                                }}
                              >
                                Pay Rent
                              </Link>
                            </button>
                          ) : (
                            <button className="buyNow">
                              <Link to={`/settenant`}>Set Tenant</Link>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }
}

export default _rcard;
