export const MIN_DELAY = 3600;
export const VOTING_DELAY=1;
export const VOTING_PERIOD =5;
export const QUORUM_PERCENTAGE = 4;
export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";


export interface networkConfigItem {
    ethUsdPriceFeed?: string
    blockConfirmations?: number
  }
  
  export interface networkConfigInfo {
    [key: string]: networkConfigItem
  }
  
  export const networkConfig: networkConfigInfo = {
    localhost: {},
    hardhat: {},
    // Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
    // Default one is ETH/USD contract on Kovan
    kovan: {
      blockConfirmations: 6,
    },
  }
  
  export const developmentChains = ["hardhat", "localhost"]
  export const proposalsFile = "proposals.json"