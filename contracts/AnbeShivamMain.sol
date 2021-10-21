// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./AnbeShivamNFT.sol";
import "./AnbeShivamInvestorToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AnbeShivamMain is Ownable {
    address GODSContract;
    address NFTContract;

    struct Content {
        uint id;
        uint receivedFunds;
        string name;
        string fileURL;
        address payable creator;
    }

    Content[] contents;

    mapping(uint => string) public projects;

    event newContentAdded(uint, string, string);
    event viewedContent(Content, address);
    event projectFunded(uint, uint, address);

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
        contents.push(Content(contents.length, 0, _name, _fileURL, payable(msg.sender)));
        projects[contents.length - 1] = _name;
        emit newContentAdded(
            contents.length - 1,
            contents[contents.length - 1].name,
            contents[contents.length - 1].fileURL
        );
    }

    function investFunds(uint _contentID, string memory _metadata) external payable {
        require(msg.value > 0 && msg.value <= 1000000 ether, "Invalid amount");
        require(msg.sender != contents[_contentID].creator, "Creator cannot invest");
        contents[_contentID].receivedFunds += msg.value;
        contents[_contentID].creator.transfer(msg.value);
        AnbeShivamInvestorToken(GODSContract).mint(msg.sender, msg.value);
        AnbeShivamNFT(NFTContract).safeMint(msg.sender, _metadata);
        emit projectFunded(_contentID, msg.value, msg.sender);
    }
}