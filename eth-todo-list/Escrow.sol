
pragma solidity >=0.7.0 <0.9.0;


contract test {

    address public buyer;
    address payable public seller;
    uint public price;

    bool public isBuyerIn;
    bool public isSellerIn;

    enum State{Not_Initialised,Awaiting_Payment,Awaiting_Delivery,Complete}
    State public currentState;

    modifier buyerOnly(){
        require(msg.sender==buyer,"Only buyer can call this method");
        _;
    }

// #####
    constructor(address _buyer,address payable _seller,uint _price) {
        buyer=_buyer;
        seller=_seller;
        price=_price;
    }


    function initContract() public {
        require(currentState==State.Not_Initialised);
        if(msg.sender==buyer)
            isBuyerIn=true;
        if(msg.sender==seller)
            isSellerIn=true;

        if(isBuyerIn && isSellerIn)
            currentState=State.Awaiting_Payment;

    }



    function deposit() buyerOnly public payable {
        require(currentState==State.Awaiting_Payment);
        require(msg.value==price);
        currentState=State.Awaiting_Delivery;
    }


    function confirmDelivery() buyerOnly public payable{
        // paying the amt in the contract
        require(currentState==State.Awaiting_Delivery);
        seller.transfer(price);
        currentState=State.Complete;
    }

    function withdraw() buyerOnly public payable{
        // paying the amt in the contract
        require(currentState==State.Awaiting_Delivery);
        payable(msg.sender).transfer(price);
        currentState=State.Complete;
    }

}
    