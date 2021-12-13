import React from "react";
import { Component } from "react";
import web3 from "web3";
class _form extends Component {

  render() {
    return (
      <div id="content">
        <h1>Add Product</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const title = this.title.value;
            const desc = this.desc.value;
            const addr = this.addr.value;
            const pc = this.pc.value;
            const rent = window.web3.utils.toWei(this.rent.value.toString(), 'Ether');
            const sale  = window.web3.utils.toWei(this.sale.value.toString(), 'Ether');
            this.props.createListing(title,desc,addr,pc,rent,sale);
          }}
        >
          <div className="form-group mr-lg">
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
          <button type="submit" className="btn btn-primary">
            Add Property to Blockchain
          </button>
        </form>
        <p>&nbsp;</p>
        <h2>Buy Properties</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Address</th>
              <th scope="col">Pincode</th>
              <th scope="col">Property Price</th>
              <th scope="col">Price for rent</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
          { this.props.listings.map((property, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{property.id.toString()}</th>
                  <td>{property.title}</td>
                  <td>{property.description}</td>
                  <td>{property.addrL1}</td>
                  <td>{property.pincode}</td>
                  <td>{window.web3.utils.fromWei(property.priceForRent.toString(), 'Ether')} Eth</td>
                  <td>{window.web3.utils.fromWei(property.priceForSale.toString(), 'Ether')} Eth</td>
                  <td>{property.currOwner}</td>
                  <td>
                    { 
                      <button
                          name={property.id}
                          value={property.priceForSale}
                          onClick={(event) => {
                            this.props.purchaceProperty(event.target.name, event.target.value)
                          }}
                        >
                          Buy
                        </button>
                    }
                    </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default _form;
