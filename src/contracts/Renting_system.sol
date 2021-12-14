pragma solidity ^0.5.0;

contract Renting_System {

    uint public blockTime;
    uint public monthlyBlocks;
    uint public duration;
    uint public durationBlocks;
    uint public monthlyRent;
    uint public beginRent;
    uint public occupiedTill;

    address payable public owner ;              
	address payable public tenant ; 

    mapping (address => uint) public rentpaidUntill; //Blocknumber untill the rent is paid.

    event TenantAdded(address _tenant);
    event RentUpdated(uint rent);
    event DurationSet(uint duration);
    event PrePayRentLimit (uint Months);
    event Rental (uint date, address renter, uint rentPaid,uint rentedFrom, uint rentedUntill);

    function initiate (uint _avgBlockTime, uint _rent, uint _advanceRent) public payable{
        require(_avgBlockTime>0);
		owner = address(msg.sender);
		blockTime = _avgBlockTime;                       
	    monthlyBlocks = 60*60*24*30/blockTime;
	    duration = 12;                                   
	    durationBlocks = duration* monthlyBlocks;
        setRent(_rent);
        if(_advanceRent>0){
            advanceRent(_advanceRent);
        }

	}

    modifier onlyOwner{
        require(msg.sender == owner);
        _;
    }
   
    modifier onlyTenant{
        require(msg.sender == tenant);
        _;
    }

	modifier eligibleToPayRent{                             //only one tenant at a time can be allowed to pay rent.
	    require(msg.sender == tenant);
	    _;
	}
   
    // Owner Functions
      
    function addTenant(address payable _tenant) public onlyOwner payable{
        tenant = _tenant;
        emit TenantAdded(_tenant);
    }

    function advanceRent(uint _months) public payable{
        duration = _months;
        durationBlocks = _months*monthlyBlocks;
        emit PrePayRentLimit(durationBlocks);
    }

    function setRent(uint _rent)  public payable{
        monthlyRent = _rent;
        emit RentUpdated(_rent);
    }
    function getTenant() public view returns (address){
        return tenant;
    }
   
    // Tenant Functions

     function payRent(uint _months) public eligibleToPayRent payable{          //needs to be eligible to pay rent
        uint _rentdue  = _months * monthlyRent;
        uint  _additionalBlocks  = _months * monthlyBlocks;
        require (msg.value == _rentdue && _additionalBlocks <= durationBlocks, "Check the rent");     

        if (rentpaidUntill[tenant] == 0 && occupiedTill < block.number) {         //hasn't rented yet & flat is empty
            rentpaidUntill[tenant] = block.number + _additionalBlocks;              //rents from now on
            beginRent = block.number;
        }
        else if (rentpaidUntill[tenant] == 0 && occupiedTill > block.number) {    //hasn't rented yet & flat is occupied
            rentpaidUntill[tenant] = occupiedTill + _additionalBlocks;            //rents from when it is free
            beginRent = occupiedTill;
        }
        else if ( rentpaidUntill[tenant] > block.number) {                          //is renting, contract is runing
            rentpaidUntill[tenant] += _additionalBlocks;                            //rents from when it is free
            beginRent = occupiedTill;
        }
        else if (rentpaidUntill[tenant] < block.number && occupiedTill>block.number) {    //has rented before & flat is occupied
            rentpaidUntill[tenant] = occupiedTill +_additionalBlocks;                     //rents from when it is free
            beginRent = occupiedTill;
        }
        else if (rentpaidUntill[tenant] < block.number && occupiedTill<block.number) {    //has rented before & flat is empty
            rentpaidUntill[tenant] = block.number + _additionalBlocks;                      //rents from now on
            beginRent = block.number;                                                     //has lived before and flat is empgy
        }
        occupiedTill  = rentpaidUntill[tenant];                                           //set new occupiedTill
        owner.transfer(msg.value);                                                        //transfer the fee to the owner
        emit Rental (block.timestamp, msg.sender, msg.value,beginRent, occupiedTill);
    }
}