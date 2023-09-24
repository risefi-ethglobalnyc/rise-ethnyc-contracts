import * as fs from "fs";
import { Network } from "../../utils/network";
import { deployContract } from "../../utils/deployer";
import { getLibraryAddress } from "../../utils/getLibraryAddress";

export type L3Addresses = {
  TestUSDC: string;
  TraderVault: string;
  Market: string;
  TokenInfo: string;
  ListingManager: string;
  RisePool: string;
  GlobalState: string;
  PriceManager: string;
  PriceFetcher: string;
  PositionVault: string;
  OrderHistory: string;
  PositionHistory: string;
  MarketOrder: string;
  OrderRouter: string;
};

async function main() {
  await deployL3Contracts();
}

async function deployL3Contracts(): Promise<L3Addresses> {
  /// Libraries

  // MathUtils
  const mathUtils = getLibraryAddress("MathUtils");

  // PositionUtils
  const positionUtils = getLibraryAddress("PositionUtils");

  // OrderUtils
  const orderUtils = getLibraryAddress("OrderUtils");

  // PnlUtils
  const pnlUtils = getLibraryAddress("PnlUtils");


  // Test USDC
  const usdc = await deployContract("TestUSDC");

  // TraderVault
  const traderVault = await deployContract("TraderVault");

  // Market
  const market = await deployContract("Market");

  // TokenInfo
  const tokenInfo = await deployContract("TokenInfo", [market.address]);

  // ListingManager
  const listingManager = await deployContract("ListingManager", [
    market.address,
  ]);

  // RisePool
  const risePool = await deployContract("RisePool");

  // GlobalState
  const globalState = await deployContract("GlobalState", [], {
    PositionUtils: positionUtils,
  });

  // PriceManager
  const priceManager = await deployContract("PriceManager", [
    globalState.address,
    tokenInfo.address,
  ]);

  // PriceFetcher
  const priceFetcher = await deployContract("PriceFetcher", [
    priceManager.address,
  ]);

  // PositionVault
  const positionVault = await deployContract(
    "PositionVault",
    [],
    { PositionUtils: positionUtils }
  );


  // OrderHistory
  const orderHistory = await deployContract("OrderHistory", [
    traderVault.address,
  ]);

  // PositionHistory
  const positionHistory = await deployContract(
    "PositionHistory",
    [positionVault.address, traderVault.address],
    { PositionUtils: positionUtils }
  );


  // MarketOrder
  const marketOrder = await deployContract(
    "MarketOrder",
    [
      traderVault.address,
      risePool.address,
      market.address,
      positionHistory.address,
      positionVault.address,
      orderHistory.address,
      priceFetcher.address,
      globalState.address,
    ],
    {
      OrderUtils: orderUtils,
      PnlUtils: pnlUtils,
    }
  );


  // OrderRouter
  const orderRouter = await deployContract("OrderRouter", [
    marketOrder.address,
  ]);

  console.log("---------------------------------------------");
  console.log(">>> L3 Contracts Deployed:");
  console.log("Test USDC:", usdc.address);
  console.log("TraderVault:", traderVault.address);
  console.log("Market:", market.address);
  console.log("TokenInfo:", tokenInfo.address);
  console.log("ListingManager:", listingManager.address);
  console.log("RisePool:", risePool.address);
  console.log("GlobalState:", globalState.address);
  console.log("PriceManager:", priceManager.address);
  console.log("PriceFetcher:", priceFetcher.address);
  console.log("PositionVault:", positionVault.address);
  console.log("OrderHistory:", orderHistory.address);
  console.log("PositionHistory:", positionHistory.address);
  console.log("MarketOrder:", marketOrder.address);
  console.log("OrderRouter:", orderRouter.address);
  console.log("---------------------------------------------");

  const l3Addresses = {
    TestUSDC: usdc.address,
    TraderVault: traderVault.address,
    Market: market.address,
    TokenInfo: tokenInfo.address,
    RisePool: risePool.address,
    ListingManager: listingManager.address,
    GlobalState: globalState.address,
    PriceManager: priceManager.address,
    PriceFetcher: priceFetcher.address,
    PositionVault: positionVault.address,
    OrderHistory: orderHistory.address,
    PositionHistory: positionHistory.address,
    MarketOrder: marketOrder.address,
    OrderRouter: orderRouter.address,
  };

  const _filePath = __dirname + "/../output/contractAddresses.json";

  // const l2Addresses = JSON.parse(fs.readFileSync(_filePath).toString())["L2"];

  fs.writeFileSync(
    _filePath,
    // JSON.stringify({ L2: l2Addresses, L3: l3Addresses }, null, 2),
    JSON.stringify({ L3: l3Addresses }, null, 2),
    { flag: "w" }
  );

  fs.chmod(_filePath, 0o777, (err) => {
    console.log(err);
  });

  return l3Addresses;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
