// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract AnbeShivamMain {

    constructor() public {
    }

    struct Content {
        string name;
        string fileURL;
        address creator;
    }

    Content[] public contents;

    function addContent(string memory _name, string memory _fileURL) external {
        contents.push(Content(_name, _fileURL, msg.sender));
    } 
}
