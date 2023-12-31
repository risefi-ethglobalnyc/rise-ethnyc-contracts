import { getContractsContext } from "../getContractsContext";
import { Constants } from "../../utils/constants";
import { Params } from "../../utils/params";

/// note: test only
export async function _addLiquidities() {
  const ctx = getContractsContext();
  const c = new Constants();
  const p = new Params();

  const tx1 = await ctx.risePool.addLiquidity(
    c.ETH_USDC_MARKET_ID,
    true,
    p.LONG_LIQUIDITY_AMOUNT, {
      // gasLimit: 1000000,
      // gasPrice: 10000000, // 100 gwei
    }
  );
  console.log(">>> addLiquidity tx1:", tx1.hash.toString());

  await tx1.wait();

  const tx2 = await ctx.risePool.addLiquidity(
    c.ETH_USDC_MARKET_ID,
    false,
    p.SHORT_LIQUIDITY_AMOUNT, {
      // gasLimit: 1000000,
      // gasPrice: 10000000, // 100 gwei
    }
  );
  await tx2.wait();

  console.log(">>> addLiquidity tx2:", tx2.hash.toString());
}

async function main() {
  await _addLiquidities();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
