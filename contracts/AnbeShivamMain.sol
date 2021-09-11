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

  Content[] public contents;
}
