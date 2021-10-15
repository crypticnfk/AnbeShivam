const AnbeShivamMain = artifacts.require("AnbeShivamMain");
const AnbeShivamNFT = artifacts.require("AnbeShivamNFT");
const AnbeShivamInvestorToken = artifacts.require("AnbeShivamInvestorToken");

module.exports = async function(deployer) {
  await deployer.deploy(AnbeShivamMain);
  await deployer.deploy(AnbeShivamInvestorToken);
  await deployer.deploy(AnbeShivamNFT);

  const asMain = await AnbeShivamMain.deployed();
  const asNFT = await AnbeShivamNFT.deployed();
  const asiToken = await AnbeShivamInvestorToken.deployed();

  await asMain.setContractAddresses(await asiToken.address, await asNFT.address);
  const MINTER_ROLE = web3.utils.soliditySha3("MINTER_ROLE");
  await asiToken.grantRole(MINTER_ROLE, await asMain.address);
  await asNFT.grantRole(MINTER_ROLE, await asMain.address);
};