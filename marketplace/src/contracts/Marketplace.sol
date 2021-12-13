pragma solidity ^0.5.0;

contract Marketplace {
    uint256 public countListings = 0;
    mapping(uint256 => Property) public listings;
    struct Property {
        uint256 id;
        address payable currOwner;
        address rentedBy;
        uint256 priceForRent;
        uint256 priceForSale;
        string title;
        string description;
        string addrL1;
        string pincode;
        bool forSale;
        bool forRent;
    }
    event propertyListed(
        uint256 id,
        address payable currOwner,
        address rentedBy,
        uint256 priceForRent,
        uint256 priceForSale,
        string title,
        string description,
        string addrL1,
        string pincode,
        bool forSale,
        bool forRent
    );

    event propertyPurchased(
        uint256 id,
        address payable currOwner,
        address rentedBy,
        uint256 priceForRent,
        uint256 priceForSale,
        string title,
        string description,
        string addrL1,
        string pincode,
        bool forSale,
        bool forRent
    );

    function createProduct(
        string memory _title,
        string memory _description,
        string memory _addrL1,
        string memory _pincode,
        bool _forSale,
        bool _forRent,
        uint256 _priceForRent,
        uint256 _priceForSale
    ) public {
        countListings++;
        require(bytes(_title).length > 0);
        require(bytes(_description).length > 0);
        require(bytes(_addrL1).length > 0);
        require(bytes(_pincode).length > 0);
        require(_priceForSale > 0);

        address payable _currOwner = msg.sender;

        listings[countListings] = Property(
            countListings,
            _currOwner,
            address(0),
            _priceForRent,
            _priceForSale,
            _title,
            _description,
            _addrL1,
            _pincode,
            _forSale,
            _forRent
        );
        emit propertyListed(
            countListings,
            _currOwner,
            address(0),
            _priceForRent,
            _priceForSale,
            _title,
            _description,
            _addrL1,
            _pincode,
            _forSale,
            _forRent
        );
    }

    function purchaceProperty(uint256 _id) public payable {
        require(listings[_id].forSale == true);
        Property memory _property = listings[_id];

        address payable _seller = _property.currOwner;
        _property.currOwner = msg.sender;
        listings[_id] = _property;
        address(_seller).transfer(msg.value);
        emit propertyPurchased(
            countListings,
            listings[_id].currOwner,
            listings[_id].rentedBy,
            listings[_id].priceForRent,
            listings[_id].priceForSale,
            listings[_id].title,
            listings[_id].description,
            listings[_id].addrL1,
            listings[_id].pincode,
            listings[_id].forSale,
            listings[_id].forRent
        );
    }
}
