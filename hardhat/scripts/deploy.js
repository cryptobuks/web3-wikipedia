const { ethers } = require("hardhat");

async function main() {
  // Variables
  let initialSupply = 100;
  initialSupply = initialSupply.toString();

  console.log(`Now, deploy contract to ${hre.network.name} network`);

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Deployer ETH balance:", (await deployer.getBalance()).toString(), "\n");

  // Deploy TmpToken
  const TmpToken = await ethers.getContractFactory("TmpToken");
  const myTmpToken = await TmpToken.deploy(initialSupply);
  await myTmpToken.deployed();

  // Deploy VoteToken
  const VoteToken = await ethers.getContractFactory("VoteToken");
  const myVoteToken = await TmpToken.deploy("0");
  await myVoteToken.deployed();

  // Deploy DAO
  const dao = await ethers.getContractFactory("DAO");
  const myDAO = await dao.deploy();
  await myDAO.deployed();

  // Debug
  console.log(`myTmpToken Contract deployed to address: ${myTmpToken.address}`);
  console.log(`myVoteToken Contract deployed to address: ${myVoteToken.address}`);
  console.log(`myDAO Contract deployed to address: ${myDAO.address}\n`);

  const tmpTokenContractSupply = await myTmpToken.balanceOf(myTmpToken.address);
  console.log(`TMPToken Contract has ${tmpTokenContractSupply} TMP`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});