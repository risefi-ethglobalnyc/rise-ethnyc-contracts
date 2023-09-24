# ETH Global NYC Submission

Our Demo Video
https://youtu.be/rvLpWH0Eclk

Rise Finance Core Contracts (ZK price feed data integrity proof)

`OrderRouter` Contract (entrypoint) on **Linea** Testnet: https://goerli.lineascan.build/address/0x0080368d63726c563352DCEF7E1C92F4f7361193

`PriceManager` Contract on **Linea** Testnet: https://goerli.lineascan.build/address/0xd78D79F3447744e76e8F661ea3D11371Cbe534Cc


Verified `OrderRouter` Contract (entrypoint) on **Scroll** Sepholia Testnet: https://sepolia-blockscout.scroll.io/address/0xd0251672a3C9f59776e6Bf7a7CdddC7c11bEd8e4/contracts#address-tabs


Verified `PriceManager` Contract on **Scroll** Sepholia Testnet: https://sepolia-blockscout.scroll.io/address/0xDa280bA8e5382CE631e79E7585267716a67b0835/contracts#address-tabs

Deployed Contracts
```
linea / celo / mantle / polygon zkevm : {
      "TestUSDC": "0x30Dbd809350C4FfE2B28ADA0c098748569eB4583",
      "TraderVault": "0x216a4a35011d1E209AF6CE1B905D65e95C52Af9b",
      "Market": "0x4E11Ef8Dc29599376628597e5Ea94F7Dbd8a9438",
      "TokenInfo": "0xc5cCD76cfFcdF59136165342B0f8E80A856aCcE4",
      "RisePool": "0x12D16b6c080F3F0CA360fde1f49f95a9753073f1",
      "ListingManager": "0x0C0aa95FdE59008b85773332e65AaeB1aead8Cd6",
      "GlobalState": "0x838D974c4fB94537bFA9e700B1a09b8324743471",
      "PriceManager": "0xd78D79F3447744e76e8F661ea3D11371Cbe534Cc",
      "PriceFetcher": "0x5527a3F2b7000AC5F73Bcf70F01C5bE79a772B47",
      "PositionVault": "0xF76cb57df586D9DdEb2BB20652CF633417887Ca3",
      "OrderHistory": "0x9A7466BbA145483a9f9DD173571c33Fb94FA2141",
      "PositionHistory": "0xDa280bA8e5382CE631e79E7585267716a67b0835",
      "MarketOrder": "0xF8C52e24b5e26E524e92b0cB2Ccb1152A60D6cbc",
      "OrderRouter": "0x0080368d63726c563352DCEF7E1C92F4f7361193"
  }
```

```
Arbitrum : {
    "TestUSDC": "0xE152E8D80e8c6721a0010faC77b7E720667e685c",
    "TraderVault": "0xe2A696E50e192D3c273aEF40C1508b8429078701",
    "Market": "0xEceB7A6B1c481615c40e91718d46026a1b3d9971",
    "TokenInfo": "0x3416cfe6B63224836f6750b1eb071aD0641E25f1",
    "RisePool": "0x9A6C3D251621B852397eceAd62818FeFF412dbDD",
    "ListingManager": "0x475E0ea9a787d09F49e809a574179f971adEd176",
    "GlobalState": "0xB5e03bc65f33b14f0d3E38112a13aFe7F94d813B",
    "PriceManager": "0x9F2104e26E966ef684e2817787189f02b19f1b43",
    "PriceFetcher": "0xAC1164Ec410Fc5759dF2B37a2DB85C3f75159c5F",
    "PositionVault": "0x1eE95af985Cb71Cc65902A56Cd32091676e72454",
    "OrderHistory": "0x27504aab52767a8BE06A61cbed1481123c25A8dE",
    "PositionHistory": "0xE89f6dF8ED4371541D5b0d5A5ef776318763946d",
    "MarketOrder": "0x4264a43a0b87a63D4ce833648eA555F824AbA38e",
    "OrderRouter": "0xc4c11CEbdc2Fdd3b282606f6c0947055e1E08972"
  }
```

```
Base : {
    "TestUSDC": "0x12D16b6c080F3F0CA360fde1f49f95a9753073f1",
    "TraderVault": "0x838D974c4fB94537bFA9e700B1a09b8324743471",
    "Market": "0xd78D79F3447744e76e8F661ea3D11371Cbe534Cc",
    "TokenInfo": "0x5527a3F2b7000AC5F73Bcf70F01C5bE79a772B47",
    "RisePool": "0x9A7466BbA145483a9f9DD173571c33Fb94FA2141",
    "ListingManager": "0xF76cb57df586D9DdEb2BB20652CF633417887Ca3",
    "GlobalState": "0xDa280bA8e5382CE631e79E7585267716a67b0835",
    "PriceManager": "0xF8C52e24b5e26E524e92b0cB2Ccb1152A60D6cbc",
    "PriceFetcher": "0x0080368d63726c563352DCEF7E1C92F4f7361193",
    "PositionVault": "0x91a3Cba8810C3368300E650eF64249f5396a3a93",
    "OrderHistory": "0xCa2Ff0E5C965B504e55d0cD1b59885f4290699F8",
    "PositionHistory": "0xf165029bfc1a40a93E5EC3F4d0148066ABA542fd",
    "MarketOrder": "0xd0251672a3C9f59776e6Bf7a7CdddC7c11bEd8e4",
    "OrderRouter": "0x4bAECdBa45727Ce60ee126f871D36D8e74BB36eE"
  }
```

```
Scroll : {
      "TestUSDC": "0x0C0aa95FdE59008b85773332e65AaeB1aead8Cd6",
      "TraderVault": "0x12D16b6c080F3F0CA360fde1f49f95a9753073f1",
      "Market": "0x838D974c4fB94537bFA9e700B1a09b8324743471",
      "TokenInfo": "0xd78D79F3447744e76e8F661ea3D11371Cbe534Cc",
      "RisePool": "0xF76cb57df586D9DdEb2BB20652CF633417887Ca3",
      "ListingManager": "0x5527a3F2b7000AC5F73Bcf70F01C5bE79a772B47",
      "GlobalState": "0x9A7466BbA145483a9f9DD173571c33Fb94FA2141",
      "PriceManager": "0xDa280bA8e5382CE631e79E7585267716a67b0835",
      "PriceFetcher": "0xF8C52e24b5e26E524e92b0cB2Ccb1152A60D6cbc",
      "PositionVault": "0x0080368d63726c563352DCEF7E1C92F4f7361193",
      "OrderHistory": "0x91a3Cba8810C3368300E650eF64249f5396a3a93",
      "PositionHistory": "0xCa2Ff0E5C965B504e55d0cD1b59885f4290699F8",
      "MarketOrder": "0xf165029bfc1a40a93E5EC3F4d0148066ABA542fd",
      "OrderRouter": "0xd0251672a3C9f59776e6Bf7a7CdddC7c11bEd8e4"
  }
```
