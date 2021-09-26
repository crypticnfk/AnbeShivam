const AnbeShivamMain = artifacts.require("AnbeShivamMain");
const AnbeShivamInvestorToken = artifacts.require("AnbeShivamInvestorToken");
const AnbeShivamNFT = artifacts.require("AnbeShivamNFT");

module.exports = function(deployer) {
  deployer.deploy(AnbeShivamMain);
  deployer.deploy(AnbeShivamInvestorToken);
  deployer.deploy(AnbeShivamNFT);
};