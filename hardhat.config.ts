import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      chainId: 1337,
      accounts: [
        `0x2bdad4c0a296fea88bd7e0cc72ecf142e7f6f74c2103e33d48423691a810bdbd`,
      ],
    },
  },
};

export default config;
