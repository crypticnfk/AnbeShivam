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
        return true;
      } catch (err) {
        console.log('Transaction rejected by user:', err);
        return false;
      };
    } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
        return true;
    } else {
        window.alert('Wallet not connected. Please install the Metamask plugin');
        return false;
    };
  } catch (err) {
    console.log('Error: ', err);
    return false;
  };
};

export const connectAccount = async () => {
  if (typeof window.ethereum !== 'undefined') {
      window.ethereum.request({ method: 'eth_requestAccounts' });
  } else {
      window.alert("Please install the Metamask plugin");
  }
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
    return true;
  } else {
    window.alert("Unidentified network, please connect to Polygon or Mumbai");
    return false;
  }
};

export const getAccountAddress = async() => {
  window.ethereum.on('accountsChanged', function (accounts) {
    window.location.reload();
  });
  const accounts = await window.ethereum.request({ method: 'eth_accounts' });
  return accounts[0];
};

export const getNetwork = async() => {
  const networkId = await web3.eth.net.getId();  
  if(networkId == 137) {
    return "Polygon";
  } else if(networkId == 80001) {
    return "Mumbai";
  } 

  return "Unidentified Network";
};

export const checkInvestor = async() => {
  const account = await getAccountAddress();
  const bl = await web3.eth.getBalance(account);
  const balance = await web3.utils.fromWei(bl.toString());
  const nfts = await getNFTBalance();
  if(parseFloat(balance) > 2 || nfts > 0) {
    return true;
  } else {
    return false;
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

export const getProjectNames = async() => {
  let projects = [];
  const pCount = await AnbeShivam.methods.returnContentCount().call();
  for(var i = 0; i < pCount; ++i) {
    const project = await AnbeShivam.methods.projects(i).call();
    projects.push(project);
  }
  return projects;
}

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
      window.location.href = "/projects";
    })
    .on("error", (error, receipt) => {
      window.alert("Error occured: ", error);
    });
};

export const returnContent = async(projectId) => {
  const account = await getAccountAddress();
  let result = false;
  await AnbeShivam.methods
    .returnContent(projectId)
    .send({
      from: account
    })
    .on("transactionHash", function (hash) {})
    .on("receipt", async function (receipt) {
      result = await receipt.events.viewedContent.returnValues[0];
    })
    .on("confirmation", (confirmationNumber, receipt) => {})
    .on("error", (error, receipt) => {
      window.alert("Error occured while accessing content");
      result = false;
    });

    return result;
};

/*export const returnProjectCount = async() => {
  const projectCount = await AnbeShivam.methods.returnContentCount().call();
  return projectCount;
};*/

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
      window.location.href = "/nfts";
    })
    .on("error", (error, receipt) => {
      window.alert("Error occured while accessing content");
    });
};

export const getNFTs = async() => {
  const account = await getAccountAddress();
  const nftCount = await ASNFT.methods.returnNFTCount().call();
  let nfts = [];
  for(var i = 0; i < nftCount; ++i) {
    const nft = await ASNFT.methods.badges(i).call();
    if(nft.owner.toUpperCase() == account.toUpperCase()) {
      nfts.push(nft);
    }
  }
  return nfts;
}

export const fetchLatestPrice = async() => {
  const networkId = await web3.eth.net.getId();

  if(networkId === 80001) {
      try {
          const aggregatorV3InterfaceABI = [{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"description","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint80","name":"_roundId","type":"uint80"}],"name":"getRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
          const addr = "0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada";
          const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI, addr);
          const roundData = await priceFeed.methods.latestRoundData().call();
          const roundPrice = roundData.answer/10**8;
          return roundPrice;
      } catch(e) {
          console.log("Error while fetching price: ", e);
      }
  } 

  else if(networkId === 137) {
      try {
          const aggregatorV3InterfaceABI = [{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"description","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint80","name":"_roundId","type":"uint80"}],"name":"getRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
          const addr = "0xAB594600376Ec9fD91F8e885dADF0CE036862dE0";
          const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI, addr);
          const roundData = await priceFeed.methods.latestRoundData().call();
          const roundPrice = roundData.answer/10**8;
          return roundPrice;
      } catch(e) {
          console.log("Error while fetching price: ", e);
      }
  } 

  return 1.3;
};