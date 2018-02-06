var TestERC20Token  = artifacts.require("./TestERC20Token.sol")
var MidTerm         = artifacts.require("./LRCMidTermHoldingContract.sol")
var LongTerm        = artifacts.require("./LRCLongTermHoldingContract.sol")
var Icebox          = artifacts.require("./LRCFoundationIceboxContract.sol")
var BatchTransfer   = artifacts.require("./BatchTransferContract.sol")
var AirDropContract = artifacts.require("./AirDropContract.sol")
var LRxAirdropAddressBinding = artifacts.require("./LRxAirdropAddressBinding.sol")

module.exports = function(deployer, network, accounts) {
  console.log("network: " + network);

  if (network == "live") {
    var lrcAddress      = "0xEF68e7C694F40c8202821eDF525dE3782458639f";

    var midTermOwner    = "0x9167E8B2EeD2418Fa520C8C036d73ceE6b88aFE9";
    // deployer.deploy(MidTerm, lrcAddress, midTermOwner);

    var longTermOwner = "0x21B257a25Ef2FB05714DEAf5026c00Ba2841c7ed";
    // deployer.deploy(LongTerm, lrcAddress, longTermOwner);

    var iceboxOwner = "0x9b9211a2ce4eEE9c5619d54E5CD9f967A68FBE23";
    // deployer.deploy(Icebox, lrcAddress, iceboxOwner);

  } else {
    deployer.deploy(BatchTransfer, accounts[0]);
    deployer.deploy(AirDropContract);
    deployer.deploy(LRxAirdropAddressBinding);

    deployer.deploy(TestERC20Token)
      .then(function() {
        return deployer.deploy(
          MidTerm,
          TestERC20Token.address,
          accounts[0]);
      })
      .then(function(){
        return deployer.deploy(
          LongTerm,
          TestERC20Token.address,
          accounts[0]);
      })
      .then(function(){
        return deployer.deploy(
          Icebox,
          TestERC20Token.address,
          accounts[0]);
      });
  }

};
