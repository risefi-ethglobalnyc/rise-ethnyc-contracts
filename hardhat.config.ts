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
    base_testnet: {
      url: "https://goerli.base.org",
      accounts: [process.env.DEPLOY_PRIVATE_KEY as string],
      gas: 1000000,
      gasPrice: 30000000000 // 0.002 Gwei
    },
    celo_testnet: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: [process.env.DEPLOY_PRIVATE_KEY as string],
      gas: 1000000,
      gasPrice: 30000000000 // 30 Gwei
    },
    linea_testnet: {
      url: "https://rpc.goerli.linea.build",
      accounts: [process.env.DEPLOY_PRIVATE_KEY as string],
    },
    mantle_testnet: {
      url: "https://rpc.testnet.mantle.xyz",
      accounts: [process.env.DEPLOY_PRIVATE_KEY as string],
      gas: 1000000,
      gasPrice: 100000000000 // 100 Gwei
    },
    neonevm_testnet: {
      url: "https://devnet.neonevm.org",
      accounts: [process.env.DEPLOY_PRIVATE_KEY as string],
      gas: 5000000,
      gasPrice: 500000000000 // 100 Gwei
    },
    polygonzkevm_testnet: {
      url: "https://rpc.public.zkevm-test.net",
      accounts: [process.env.DEPLOY_PRIVATE_KEY as string],
    },
    scroll_testnet: {
      url: "https://sepolia-rpc.scroll.io",
      accounts: [process.env.DEPLOY_PRIVATE_KEY as string],
      gas: 1000000,
      gasPrice: 10000000 // 100 Gwei 4개줄임
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
      {
        network: "arbitrum_testnet",
        chainId: 421613,
        urls: {
          apiURL: "https://goerli.arbiscan.io/api",
          browserURL: "https://goerli.arbiscan.io/",
        },
      },
      {
        network: "base_testnet",
        chainId: 84531,
        urls: {
          apiURL: "https://goerli.basescan.org/api",
          browserURL: "https://goerli.basescan.org/",
        },
      },
      {
        network: "celo_testnet",
        chainId: 44787,
        urls: {
          apiURL: "https://alfajores.celoscan.io/api",
          browserURL: "https://alfajores.celoscan.io/",
        },
      },
      {
        network: "linea_testnet",
        chainId: 59140,
        urls: {
          apiURL: "https://explorer.goerli.linea.build/api",
          browserURL: "https://explorer.goerli.linea.build/",
        },
      },
      {
        network: "mantle_testnet",
        chainId: 5001,
        urls: {
          apiURL: "https://explorer.testnet.mantle.xyz/api",
          browserURL: "https://explorer.testnet.mantle.xyz/",
        },
      },
      {
        network: "neonevm_testnet",
        chainId: 245022940,
        urls: {
          apiURL: "https://devnet.neonscan.org/api",
          browserURL: "https://devnet.neonscan.org/",
        },
      },
      {
        network: "polygonzkevm_testnet",
        chainId: 245022940,
        urls: {
          apiURL: "https://testnet-zkevm.polygonscan.com/api",
          browserURL: "https://testnet-zkevm.polygonscan.com/",
        },
      },
      {
        network: "scroll_testnet",
        chainId: 534351,
        urls: {
          apiURL: "https://scroll.l2scan.co/api",
          browserURL: "https://scroll.l2scan.co/",
        },
      },
    ],
  },
};

export default config;
