pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract TmpToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("TmpToken", "TMP") {
        _mint(msg.sender, initialSupply * 10**uint256(decimals()));
        // _mint(address(this), initialSupply);
        console.log("sender address : %s", address(this));
    }

    function mint(address to, uint256 supply) public {
        _mint(to, supply);
    }
}


contract VoteToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("VoteToken", "VOTO") {}

    function mint(address to, uint256 supply) public {
        _mint(to, supply);
    }
}
