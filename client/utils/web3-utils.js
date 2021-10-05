import Web3 from "web3";
import AnbeShivamNFT from "../abis/AnbeShivamNFT.json";
import AnbeShivamMain from "../abis/AnbeShivamMain.json";
import AnbeShivamInvestorToken from  "../abis/AnbeShivamInvestorToken.json";

export const web3 = new Web3(window.ethereum);

const networkId = await web3.eth.net.getId();
const networkData = AnbeShivamMain.networks[networkId];
export const AnbeShivam = new web3.eth.Contract(AnbeShivamMain.abi, networkData.address);
export const AnbeShivamNFT = new web3.eth.Contract(AnbeShivamNFT.abi, networkData.address);
export const GODSToken = new web3.eth.Contract(AnbeShivamInvestorToken.abi, networkData.address);

export const getGODSBalance = async(account) => {
    const balance = await GODSToken.methods.balanceOf(account).call();
    return balance;
}

export const getNFTBalance = async(account) => {
    const balance = await AnbeShivamNFT.methods.balanceOf(account).call();
    return balance;
}

