// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

import "@openzeppelin/contracts/utils/introspection/ERC165Storage.sol";

contract SmartistContract is ERC721, Ownable, ERC165Storage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(uint256 => string) internal metadata;
    mapping(uint256 => uint16) internal royalties;

    uint16 public constant ROYALTY_AMOUNT = 10;
    bytes4 private constant _INTERFACE_ID_ERC2981 = 0xc155531d;

    constructor(string memory name, string memory symbol) payable ERC721(name, symbol) {
        _registerInterface(_INTERFACE_ID_ERC2981);
    }

    function artistMint(string memory ipfsHash) public onlyOwner {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        metadata[newItemId] = ipfsHash;
        _mint(address(owner()), newItemId);
    }

    function setRoyalty(uint256 tokenID, uint16 basisPoints) public onlyOwner {
        royalties[tokenID] = basisPoints;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory baseURI = _baseURI();
        return string(abi.encodePacked(baseURI, metadata[tokenId], "/metadata.json"));
    }

    function royaltyInfo(
        uint256 tokenId,
        uint256 value,
        bytes calldata _data
    ) external view returns (address _receiver, uint256 _royaltyAmount) {
        uint256 percentage = Math.max(royalties[tokenId], ROYALTY_AMOUNT);
        _royaltyAmount = (value * percentage) / 100;

        return (owner(), _royaltyAmount);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC165Storage, ERC721) returns (bool) {
        return ERC165Storage.supportsInterface(interfaceId);
    }

    function totalSupply() public pure returns (uint256) {
        return 1000;
    }
}
