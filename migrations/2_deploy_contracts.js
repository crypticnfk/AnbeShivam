const AnbeShivamMain = artifacts.require("AnbeShivamMain");
const AnbeShivamInvestorToken = artifacts.require("AnbeShivamInvestorToken");

module.exports = function(deployer) {
  deployer.deploy(AnbeShivamMain);
  deployer.deploy(AnbeShivamInvestorToken);
};