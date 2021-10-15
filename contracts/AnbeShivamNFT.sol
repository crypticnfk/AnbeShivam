pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract AnbeShivamNFT is ERC721, ERC721URIStorage, AccessControl {
    using Counters for Counters.Counter;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("AnbeShivamNFT", "ANBE") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    struct Badge {
        uint tokenID;
        address owner;
    }

    Badge[] public badges;

    function returnNFTCount() public view returns(uint) {
        return _tokenIdCounter.current();
    }

    function safeMint(address _to, string memory _tokenURI) public onlyRole(MINTER_ROLE) {
        _safeMint(_to, _tokenIdCounter.current());
        _setTokenURI(_tokenIdCounter.current(), _tokenURI);
        badges.push(Badge(_tokenIdCounter.current(), _to));
        _tokenIdCounter.increment();
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}