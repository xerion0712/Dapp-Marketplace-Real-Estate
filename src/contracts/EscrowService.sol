
pragma solidity >=0.7.0 <0.9.0;


contract EscrowService {

    // 4 states of Escrow Service
    enum State{Not_Initialised,Awaiting_Payment,Awaiting_Delivery,Complete}
    State public currentState;

    address public buyer;
    address payable public seller;
    uint public price;

    bool public hasBuyerInit;
    bool public hasSellerInit;

// Modifier to ensure buyer access the method
    modifier onlyBuyer(){
        require(msg.sender==buyer,"Only buyer can call this method");
        _;
    }

// Parametrised Constructor
    constructor(address _buyer,address payable _seller,uint _price) {
        buyer=_buyer;
        seller=_seller;
        price=_price;
    }

// function to initiate the contract.Upon initialization state is set to Awaiting_Payment
    function initContract() public {
        require(currentState==State.Not_Initialised);
        if(msg.sender==buyer)
            hasBuyerInit=true;
        if(msg.sender==seller)
            hasSellerInit=true;

        if(hasBuyerInit && hasSellerInit)
            currentState=State.Awaiting_Payment;
    }


// function to allow buyer to deposit his funds
    function deposit() onlyBuyer public payable {
        require(currentState==State.Awaiting_Payment);
        require(msg.value==price,"Amount is not equal to the required price");
        currentState=State.Awaiting_Delivery;
    }

// function to confirm by buyer that he has received the product
// transfer the funds to the seller
    function confirmDelivery() onlyBuyer public payable{
        require(currentState==State.Awaiting_Delivery);
        seller.transfer(price);
        currentState=State.Complete;
    }

// function to withdraw the funds in case the buyer never receives anything
    function withdraw() onlyBuyer public payable{
        require(currentState==State.Awaiting_Delivery);
        payable(msg.sender).transfer(price);
        currentState=State.Complete;
    }

}
    