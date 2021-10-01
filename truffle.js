module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    /*polygon: {
      provider: () => new HDWalletProvider(mnemonic, "https://polygon-mainnet.infura.io/v3/" + process.env.PROJECT_ID),
      network_id: 137,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    mumbai: {
      provider: () => new HDWalletProvider(mnemonic, "https://polygon-mumbai.infura.io/v3/" + process.env.PROJECT_ID),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    }*/
  },

  contracts_build_directory: './client/abis/',
  compilers: {
    solc: {
      version: "^0.8.0",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
