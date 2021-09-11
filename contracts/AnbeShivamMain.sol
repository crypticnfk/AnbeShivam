// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract AnbeShivamMain {
  constructor() public {
  }

  struct Content {
    string name;
    string fileURL;
    address owner;
  }

  uint contentCount;
  Content[] public contents;

  function createContent(string memory _name, string memory _fileURL) external {
    contentCount++;
    contents[contentCount] = Content(_name, _fileURL, msg.sender);
  } 
}
