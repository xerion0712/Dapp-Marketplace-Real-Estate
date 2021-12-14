const Marketplace = artifacts.require('./Marketplace.sol')
const Renting = artifacts.require('./Renting_System.sol')
require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Marketplace', ([deployer, seller, buyer]) => {
  let marketplace,rent

  before(async () => {
    marketplace = await Marketplace.deployed()
    rent = await Renting.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await marketplace.address
      assert.notEqual(address, 0x0)
    //   assert.notEqual(address, '')
    //   assert.notEqual(address, null)
    //   assert.notEqual(address, undefined)
    })
  })
  describe('products', async () => {
      let result, productCount;
      before(async () => {
          result = await marketplace.createListing("a","a","a","a",true,false,web3.utils.toWei("1",'Ether'),web3.utils.toWei("1",'Ether'),{from: seller} )
          productCount = await marketplace.countListings()
      })
    it('adds products correctly', async () => {
      
      assert.equal(productCount, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), productCount)
      assert.equal(event.title, "a", 'is correct')
      assert.equal(event.description, "a", 'is correct')
      assert.equal(event.priceForRent, "1000000000000000000", 'is correct')
      assert.equal(event.priceForSale,"1000000000000000000" , 'is correct')
      

    })
  })
  describe('rents', async () => {
    let result, owner, x;
    before(async () => {
        result = await rent.createRentRelation(3,{from: seller} )
        x = await rent.
        owner = await rent.owner()
    })
  it('adds products correctly', async () => {
    
    assert.equal(owner, seller)
    
    

  })
})

})
