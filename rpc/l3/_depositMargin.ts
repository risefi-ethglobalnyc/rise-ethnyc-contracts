import { getContractsContext } from "../getContractsContext";
import { Constants } from "../../utils/constants";
import { Params } from "../../utils/params";
import { ethers } from "ethers";

/// note: test only
export async function _depositMargin(trader: string, amount: string) {
  const ctx = getContractsContext();
  const c = new Constants();
  const p = new Params();

  await ctx.traderVault.increaseTraderBalance(
    trader,
    c.USDC_ID,
    ethers.utils.parseUnits(amount, c.USDC_DECIMALS), {
      gasLimit: 1000000,
      gasPrice: 10000000, // 100 gwei
    }
  );
}
