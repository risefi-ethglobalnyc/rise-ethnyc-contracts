import { HardhatUserConfig } from "hardhat/config";
import "solidity-coverage";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 100,
      },
    },
  },
  networks: {
    l3local: {
      url: "http://localhost:8449",
      accounts: [process.env.DEPLOY_PRIVATE_KEY as string],
    },
    l3testnet: {
      url: "https://rpc.risefinance.io/",
      accounts: [process.env.DEPLOY_PRIVATE_KEY as string],
    },
    l2local: {
      url: "http://127.0.0.1:7545",
      accounts: [process.env.DEPLOY_PRIVATE_KEY as string],
    },
    l2testnet: {
      url: "https://goerli-rollup.arbitrum.io/rpc", // Arbitrum Testnet
      accounts: [process.env.DEPLOY_PRIVATE_KEY as string],
    },

    // evm chains
    arbitrum_testnet: {
      url: "https://goerli-rollup.arbitrum.io/rpc", // Arbitrum Testnet
      accounts: [process.env.DEPLOY_PRIVATE_KEY as string],
    },
    polygonzkevm_testnet: {
      url: "https://rpc.public.zkevm-test.net",
      accounts: [process.env.DEPLOY_PRIVATE_KEY as string],
    },
    scroll_testnet: {
      url: "https://sepolia-rpc.scroll.io",
      accounts: [process.env.DEPLOY_PRIVATE_KEY as string],
    },
    base_testnet: {
      url: "https://goerli.base.org",
      accounts: [process.env.DEPLOY_PRIVATE_KEY as string],
    },
    mantle_testnet: {
      url: "https://rpc.testnet.mantle.xyz",
      accounts: [process.env.DEPLOY_PRIVATE_KEY as string],
    },
    celo_testnet: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: [process.env.DEPLOY_PRIVATE_KEY as string],
    },
    linea_testnet: {
      url: "https://rpc.goerli.linea.build",
      accounts: [process.env.DEPLOY_PRIVATE_KEY as string],
    },
    neonevm_testnet: {
      url: "https://testnet.neonevm.org",
      accounts: [process.env.DEPLOY_PRIVATE_KEY as string],
    },
  },
  etherscan: {
    apiKey: process.env.ARBISCAN_API_KEY as string,
    customChains: [
      {
        network: "l3testnet",
        chainId: 13842181671,
        urls: {
          apiURL: "https://explorer.risefinance.io/api",
          browserURL: "https://explorer.risefinance.io",
        },
      },
    ],
  },
};

export default config;
