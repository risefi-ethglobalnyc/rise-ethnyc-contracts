// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeCast.sol";

import "./PnlUtils.sol";
import "../common/structs.sol";

import "../account/TraderVault.sol";
import "../risepool/RisePool.sol";
import "../market/Market.sol";

import "hardhat/console.sol";

contract PnlManager {
    using SafeCast for uint256;
    using SafeCast for int256;

    TraderVault public traderVault;
    RisePool public risePool;
    Market public market;

    constructor(
        address _traderVault,
        address _risePool,
        address _market
    ) {
        traderVault = TraderVault(_traderVault);
        risePool = RisePool(_risePool);
        market = Market(_market);
    }

    function settlePnL(
        OpenPosition memory _position,
        bool _isLong,
        uint256 _executionPrice,
        uint256 _marketId,
        uint256 _sizeAbs,
        uint256 _marginAbs
    ) public returns (int256) {
        MarketInfo memory marketInfo = market.getMarketInfo(_marketId);


        int256 pnl = PnlUtils._calculatePnL(
            _sizeAbs,
            _position.avgOpenPrice,
            _executionPrice,
            _isLong
        );

        traderVault.increaseTraderBalance(
            _position.trader,
            marketInfo.marginAssetId,
            _marginAbs
        );

        // TODO: check - PnL includes margin?
        _isLong
            ? risePool.decreaseLongReserveAmount(_marketId, _sizeAbs)
            : risePool.decreaseShortReserveAmount(_marketId, _sizeAbs);

        pnl >= 0
            ? traderVault.increaseTraderBalance(
                _position.trader,
                marketInfo.marginAssetId,
                (pnl).toUint256()
            )
            : traderVault.decreaseTraderBalance(
                _position.trader,
                marketInfo.marginAssetId,
                (-pnl).toUint256()
            );

        return pnl;
    }
}
