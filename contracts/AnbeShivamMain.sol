// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./AnbeShivamInvestorToken.sol";

contract AnbeShivamMain {
    address tokenContract;

    struct Content {
        uint256 receivedFunds;
        string name;
        string fileURL;
        address payable creator;
    }

    Content[] public contents;

    event newContentAdded(string name, string fileURL);

    function setTokenContractAddress(address _tokenContract) external {
        tokenContract = _tokenContract;
    }

    function returnContentCount() external view returns (uint256) {
        return contents.length;
    }

    function addContent(string memory _name, string memory _fileURL) external {
        contents.push(Content(0, _name, _fileURL, payable(msg.sender)));
        emit newContentAdded(
            contents[contents.length - 1].name,
            contents[contents.length - 1].fileURL
        );
    }

    function investFunds(uint256 contentID) external payable {
        contents[contentID].creator.transfer(msg.value);
        contents[contentID].receivedFunds += msg.value;
        AnbeShivamInvestorToken(tokenContract).mint(msg.sender, msg.value);
    }
}
