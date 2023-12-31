import { getContractsContext } from "../getContractsContext";
import { Constants } from "../../utils/constants";
import { Params } from "../../utils/params";
import { ethers } from "ethers";

/// note: test only
export async function _setPrice(price: string) {
  const ctx = getContractsContext();
  const c = new Constants();
  const p = new Params();

  await ctx.priceManager.setPrice(
    c.ETH_USDC_MARKET_ID,
    ethers.utils.parseUnits(price, c.USDC_DECIMALS), {
      // gasLimit: 1000000,
      // gasPrice: 10000000, // 100 gwei
    }
  );
}
async function main() {
  await _setPrice("1760");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
