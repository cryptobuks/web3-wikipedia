const { ethers } = require("hardhat");

async function main() {
  // Variables
  let initialSupply = 100;
  initialSupply = initialSupply.toString();

  console.log(`Now, deploy contract to ${hre.network.name} network`);

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Deployer ETH balance:", (await deployer.getBalance()).toString(), "\n");

  // Deploy WikiToken
  const WikiToken = await ethers.getContractFactory("WikiToken");
  const myWikiToken = await WikiToken.deploy(initialSupply);
  await myWikiToken.deployed();

  // Deploy VoteToken
  const VoteToken = await ethers.getContractFactory("VoteToken");
  const myVoteToken = await VoteToken.deploy("0");
  await myVoteToken.deployed();

  // Deploy DAO
  const dao = await ethers.getContractFactory("DAO");
  const myDAO = await dao.deploy();
  await myDAO.deployed();

  // Debug
  console.log(`myWikiToken Contract deployed to address: ${myWikiToken.address}`);
  console.log(`myVoteToken Contract deployed to address: ${myVoteToken.address}`);
  console.log(`myDAO Contract deployed to address: ${myDAO.address}\n`);

  const wikiTokenContractSupply = await myWikiToken.balanceOf(myWikiToken.address);
  console.log(`WikiToken Contract has ${wikiTokenContractSupply} WIK`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
