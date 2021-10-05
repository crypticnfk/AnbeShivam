import Web3 from "web3";
import AnbeShivamNFT from "../abis/AnbeShivamNFT.json";
import AnbeShivamMain from "../abis/AnbeShivamMain.json";
import AnbeShivamInvestorToken from  "../abis/AnbeShivamInvestorToken.json";

export const web3 = new Web3(window.ethereum);

const networkId = await web3.eth.net.getId();
const networkData = AnbeShivamMain.networks[networkId];

const AnbeShivam = new web3.eth.Contract(AnbeShivamMain.abi, networkData.address);
const AnbeShivamNFT = new web3.eth.Contract(AnbeShivamNFT.abi, networkData.address);
const GODSToken = new web3.eth.Contract(AnbeShivamInvestorToken.abi, networkData.address);

export const getAccountAddress = async() => {
    const accounts = await web3.eth.getAccounts();
    return accounts[0];
};

export const getGODSBalance = async() => {
    const account = getAccountAddress();
    const result = await GODSToken.methods.balanceOf(account).call();
    const balance = web3.utils.fromWei(result);
    return balance;
};

export const getNFTBalance = async() => {
    const account = getAccountAddress();
    const balance = await AnbeShivamNFT.methods.balanceOf(account).call();
    return balance;
};

export const getTokenURI = async(tokenId) => {
    const uri = await AnbeShivamNFT.methods.tokenURI(tokenId).call();
    return uri;
};

export const addContent = async(projectName, fileURL) => {
    const account = getAccountAddress();
    await AnbeShivam.methods
      .addContent(projectName, fileURL)
      .send({
        from: account
      })
      .on("transactionHash", function (hash) {})
      .on("receipt", function (receipt) {})
      .on("confirmation", (confirmationNumber, receipt) => {
        window.alert("Project was added successfully");
      })
      .on("error", (error, receipt) => {
        window.alert("Error occured: ", error);
      });
  
    window.location.reload();
};

export const returnContent = async(projectId) => {
    const account = getAccountAddress();
    await AnbeShivam.methods
      .returnContent(projectId)
      .send({
        from: account
      })
      .on("transactionHash", function (hash) {})
      .on("receipt", function (receipt) {})
      .on("confirmation", (confirmationNumber, receipt) => {        
        const result = await web3.eth.getTransactionReceipt(receipt.transactionHash);
        const event = result.logs[0].topics[0];
        return event[0];
      })
      .on("error", (error, receipt) => {
        window.alert("Error occured while accessing content");
      });
};

export const returnProjectCount = async() => {
    const projectCount = await AnbeShivam.methods.returnContentCount().call();
    return projectCount;
};

export const investFunds = async(contentId, metadata, amount) => {
    const account = getAccountAddress();
    await AnbeShivam.methods
      .investFunds(contentId, metadata)
      .send({
        from: account,
        value: web3.utils.toWei(amount.toString())
      })
      .on("transactionHash", function (hash) {})
      .on("receipt", function (receipt) {})
      .on("confirmation", (confirmationNumber, receipt) => {
        window.alert("Successfully funded project " + contentId.toString());
      })
      .on("error", (error, receipt) => {
        window.alert("Error occured while accessing content");
      });
};