import * as fs from "fs";
import { Network } from "../../utils/network";
import { deployContract } from "../../utils/deployer";
import { getLibraryAddress } from "../../utils/getLibraryAddress";
import { getContractAddress } from "../../utils/getContractAddress";
import { getPresetAddress } from "../../utils/getPresetAddress";

export type L3Addresses = {
  TraderVault: string;
  Market: string;
  TokenInfo: string;
  ListingManager: string;
  RisePool: string;
  GlobalState: string;
  L3Gateway: string;
  PriceManager: string;
  PriceFetcher: string;
  PositionVault: string;
  OrderValidator: string;
  OrderHistory: string;
  PositionHistory: string;
  PositionManager: string;
  MarketOrder: string;
  OrderRouter: string;
  PriceMaster: string;
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

  const l2MarginGateway = getContractAddress("L2MarginGateway", Network.L2);

  const keeper = getPresetAddress("keeper");

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

  // L3Gateway
  const l3Gateway = await deployContract("L3Gateway", [
    traderVault.address,
    tokenInfo.address,
    risePool.address,
    market.address,
    l2MarginGateway,
  ]);

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

  // OrderValidator
  const orderValidator = await deployContract("OrderValidator", [
    positionVault.address,
    globalState.address,
    risePool.address,
  ]);

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

  // PositionManager
  const positionManager = await deployContract(
    "PositionManager",
    [positionVault.address, market.address],
    { OrderUtils: orderUtils, PnlUtils: pnlUtils }
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
      orderValidator.address,
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

  // PriceMaster
  const priceMaster = await deployContract("PriceMaster", [
    priceManager.address,
    keeper, // price keeper
  ]);

  console.log("---------------------------------------------");
  console.log(">>> L3 Contracts Deployed:");
  console.log("TraderVault:", traderVault.address);
  console.log("Market:", market.address);
  console.log("TokenInfo:", tokenInfo.address);
  console.log("ListingManager:", listingManager.address);
  console.log("RisePool:", risePool.address);
  console.log("GlobalState:", globalState.address);
  console.log("L3Gateway:", l3Gateway.address);
  console.log("PriceManager:", priceManager.address);
  console.log("PriceFetcher:", priceFetcher.address);
  console.log("PositionVault:", positionVault.address);
  console.log("OrderValidator:", orderValidator.address);
  console.log("OrderHistory:", orderHistory.address);
  console.log("PositionHistory:", positionHistory.address);
  console.log("PositionManager:", positionManager.address);
  console.log("MarketOrder:", marketOrder.address);
  console.log("OrderRouter:", orderRouter.address);
  console.log("PriceMaster:", priceMaster.address);
  console.log("---------------------------------------------");

  const l3Addresses = {
    TraderVault: traderVault.address,
    Market: market.address,
    TokenInfo: tokenInfo.address,
    RisePool: risePool.address,
    ListingManager: listingManager.address,
    GlobalState: globalState.address,
    L3Gateway: l3Gateway.address,
    PriceManager: priceManager.address,
    PriceFetcher: priceFetcher.address,
    PositionVault: positionVault.address,
    OrderValidator: orderValidator.address,
    OrderHistory: orderHistory.address,
    PositionHistory: positionHistory.address,
    PositionManager: positionManager.address,
    MarketOrder: marketOrder.address,
    OrderRouter: orderRouter.address,
    PriceMaster: priceMaster.address,
  };

  const _filePath = __dirname + "/../output/contractAddresses.json";

  const l2Addresses = JSON.parse(fs.readFileSync(_filePath).toString())["L2"];

  fs.writeFileSync(
    _filePath,
    JSON.stringify({ L2: l2Addresses, L3: l3Addresses }, null, 2),
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
