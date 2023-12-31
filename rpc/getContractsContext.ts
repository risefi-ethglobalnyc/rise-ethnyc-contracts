import { getContract, getLibrary } from "../utils/getContract";
import { getContractAddress } from "../utils/getContractAddress";
import { getPresetAddress } from "../utils/getPresetAddress";
import { Network } from "../utils/network";

export function getContractsContext() {
  const mathUtils = getLibrary("utils", "MathUtils", Network.L3);
  const orderUtils = getLibrary("order", "OrderUtils", Network.L3);
  const positionUtils = getLibrary("position", "PositionUtils", Network.L3);
  const pnlUtils = getLibrary("position", "PnlUtils", Network.L3);

  const wethAddress = getPresetAddress("WETH");
  const testUSDCAddress = getContractAddress("TestUSDC", Network.L3);

  const traderVault = getContract("account", "TraderVault", Network.L3);
  const market = getContract("market", "Market", Network.L3);
  const tokenInfo = getContract("market", "TokenInfo", Network.L3);
  const listingManager = getContract("market", "ListingManager", Network.L3);
  const risePool = getContract("risepool", "RisePool", Network.L3);
  const globalState = getContract("global", "GlobalState", Network.L3);
  const priceManager = getContract("price", "PriceManager", Network.L3);
  const priceFetcher = getContract("order", "PriceFetcher", Network.L3);
  const positionVault = getContract("position", "PositionVault", Network.L3);
  const orderHistory = getContract("order", "OrderHistory", Network.L3);
  const positionHistory = getContract(
    "position",
    "PositionHistory",
    Network.L3
  );
  const marketOrder = getContract("order", "MarketOrder", Network.L3);
  const orderRouter = getContract("order", "OrderRouter", Network.L3);

  return {
    mathUtils,
    positionUtils,
    orderUtils,
    pnlUtils,
    wethAddress,
    testUSDCAddress,
    traderVault,
    market,
    tokenInfo,
    listingManager,
    risePool,
    globalState,
    priceManager,
    priceFetcher,
    positionVault,
    orderHistory,
    positionHistory,
    marketOrder,
    orderRouter,
  };
}
