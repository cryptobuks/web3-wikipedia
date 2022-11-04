/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

const ethers = require('ethers');

module.exports = {
  solidity: "0.8.4",
  networks: {
    localhost: {},
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_GOERLI}`,
      accounts: [`${process.env.GOERLI_PRIVATE_KEY}`]
    }
  }
};
