// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./AnbeShivamNFT.sol";
import "./AnbeShivamInvestorToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AnbeShivamMain is Ownable {
    address GODSContract;
    address NFTContract;

    struct Content {
        uint receivedFunds;
        string name;
        string fileURL;
        address payable creator;
    }

    Content[] contents;

    event newContentAdded(uint, string, string);
    event viewedContent(Content, address);

    function setContractAddresses(
        address _GODSContract, 
        address _NFTContract
    ) 
        external 
        onlyOwner 
    {
        GODSContract = _GODSContract;
        NFTContract = _NFTContract;
    }

    function returnContentCount() external view returns (uint) {
        return contents.length;
    }

    function returnContent(uint _contentID) external {
        emit viewedContent(contents[_contentID], msg.sender);
    } 

    function addContent(string memory _name, string memory _fileURL) external {
        contents.push(Content(0, _name, _fileURL, payable(msg.sender)));
        emit newContentAdded(
            contents.length - 1,
            contents[contents.length - 1].name,
            contents[contents.length - 1].fileURL
        );
    }

    function investFunds(uint _contentID, string memory _metadata) external payable {
        contents[_contentID].receivedFunds += msg.value;
        contents[_contentID].creator.transfer(msg.value);
        AnbeShivamInvestorToken(GODSContract).mint(msg.sender, msg.value);
        AnbeShivamNFT(NFTContract).safeMint(msg.sender, _metadata);
    }
}