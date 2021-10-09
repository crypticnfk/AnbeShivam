import Web3 from "web3";
import AnbeShivamNFT from "../abis/AnbeShivamNFT.json";
import AnbeShivamMain from "../abis/AnbeShivamMain.json";
import AnbeShivamInvestorToken from  "../abis/AnbeShivamInvestorToken.json";

let web3, AnbeShivam, ASNFT, GODSToken;

export const loadWeb3 = async () => {
  try {
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        return web3;
      } catch (err) {
        console.log('Transaction rejected by user:', err)
      };
    } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
        return web3;
    } else {
        window.alert('Non-Ethereum browser detected. Please install MetaMask plugin');
        return;
    };
  } catch (err) {
    console.log('Error: ', err);
  };
};

export const loadBlockchainData = async() => {
  const networkId = await web3.eth.net.getId();
  const asMainData = AnbeShivamMain.networks[networkId];
  const asNFTData = AnbeShivamNFT.networks[networkId];
  const asGODSData = AnbeShivamInvestorToken.networks[networkId];

  if(asMainData && asNFTData && asGODSData) {
    AnbeShivam = new web3.eth.Contract(AnbeShivamMain.abi, asMainData.address);
    ASNFT = new web3.eth.Contract(AnbeShivamNFT.abi, asNFTData.address);
    GODSToken = new web3.eth.Contract(AnbeShivamInvestorToken.abi, asGODSData.address);
  } else {
    window.alert("The contract was not deployed to the current network");
  }
};

export const getAccountAddress = async() => {
  const accounts = await web3.eth.getAccounts();
  return accounts[0];
};

export const checkInvestor = async() => {
  const account = await getAccountAddress();
  const bl = await web3.eth.getBalance(account);
  const balance = await web3.utils.fromWei(bl.toString());
  const nfts = await getNFTBalance(web3);
  if(parseFloat(balance) > 10 || nfts > 0) {
    window.alert("Welcome investor");
  } else {
    window.alert("You're not allowed access");
  }
}

export const getGODSBalance = async() => {
  const account = await getAccountAddress();
  const result = await GODSToken.methods.balanceOf(account).call();
  const balance = web3.utils.fromWei(result);
  return balance;
};

export const getNFTBalance = async() => {
  const account = await getAccountAddress();
  const balance = await ASNFT.methods.balanceOf(account).call();
  return balance;
};

export const getTokenURI = async(tokenId) => {
  const uri = await ASNFT.methods.tokenURI(tokenId).call();
  return uri;
};

export const addContent = async(projectName, fileURL) => {
  const account = await getAccountAddress();
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
  const account = await getAccountAddress();
  await AnbeShivam.methods
    .returnContent(projectId)
    .send({
      from: account
    })
    .on("transactionHash", function (hash) {})
    .on("receipt", function (receipt) {})
    .on("confirmation", (confirmationNumber, receipt) => {        
      const result = web3.eth.getTransactionReceipt(receipt.transactionHash);
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
  const account = await getAccountAddress();
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