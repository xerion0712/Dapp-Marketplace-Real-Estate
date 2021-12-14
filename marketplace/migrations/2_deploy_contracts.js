const Marketplace = artifacts.require("Marketplace");
const Renting = artifacts.require("Renting_System");
module.exports = function(deployer) {
  deployer.deploy(Marketplace);
  deployer.deploy(Renting);
};