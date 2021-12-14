pragma solidity 0.5.0;

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


    function createRentRelation (uint _avgBlockTime) public payable{
		owner = msg.sender;
		blockTime = _avgBlockTime;                       
	    monthlyBlocks = 60*60*24*30/blockTime;
	    duration = 12;                                   
	    durationBlocks = duration* monthlyBlocks;
        
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

    function advanceRent(uint _months) public onlyOwner payable{
        durationBlocks = _months*monthlyBlocks;
        emit PrePayRentLimit(durationBlocks);
    }

    function setRent(uint _rent) public onlyOwner payable{
        monthlyRent = _rent;
        emit RentUpdated(_rent);
    }
   
    // Tenant Functions

     function payRent(uint _months) public eligibleToPayRent payable{          //needs to be eligible to pay rent
        uint _rentdue  = _months * monthlyRent;
        uint  _additionalBlocks  = _months * monthlyBlocks;
        require (msg.value == _rentdue, "Check the rent");     //sent in Ether has to be _rentdue; additional blocks for rental cannot be higher than limit.                                  //accumulate revenues
    
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
        owner.transfer(msg.value);
        emit Rental (block.timestamp, msg.sender, msg.value,beginRent, occupiedTill);
    }
}