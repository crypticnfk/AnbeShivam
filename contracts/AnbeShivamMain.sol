// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AnbeShivamMain is ERC20{

    constructor() ERC20("AnbeShivam Coin","GODS") {
    }

    struct Content {
        uint receivedFunds;
        string name;
        string fileURL;
        address payable creator;
    }

    Content[] public contents;

    event contentAdded(
        string name,
        string fileURL
    );

    function returnContentCount() 
        public  
        view 
        returns (uint) 
    {
        return contents.length;
    }

    function addContent(
        string memory _name, 
        string memory _fileURL
    ) 
        external 
    {
        contents.push(Content(0, _name, _fileURL, payable(msg.sender)));
        emit contentAdded(contents[contents.length-1].name, contents[contents.length-1].fileURL);
    } 
    
    function investFunds(uint contentID) 
        external 
        payable 
    {
        contents[contentID].creator.transfer(msg.value);
        contents[contentID].receivedFunds += msg.value;
        _mint(msg.sender, msg.value);
    }
}
