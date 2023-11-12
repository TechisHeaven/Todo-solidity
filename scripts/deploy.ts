import { ethers } from "hardhat";

async function main() {

  const lock = await ethers.deployContract("Todo");

  await lock.waitForDeployment();

  console.log(
    `Contract Deployed to ${lock.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
