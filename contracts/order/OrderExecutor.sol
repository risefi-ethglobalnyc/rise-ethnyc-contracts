// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../common/constants.sol";
import "../common/structs.sol";
import "../common/params.sol";
import "../position/PositionHistory.sol";
import "../position/PositionVault.sol";
import "../position/PnlManager.sol";
import "../account/TraderVault.sol";
import "../risepool/RisePool.sol";

import "hardhat/console.sol";

contract OrderExecutor is PnlManager {
    PositionHistory public positionHistory;
    PositionVault public positionVault;

    struct ExecutionContext {
        OpenPosition openPosition;
        OrderExecType execType;
        bytes32 key;
        uint256 marketId;
        uint256 marginAssetId;
        uint256 sizeAbs;
        uint256 marginAbs;
        uint256 positionRecordId;
        uint256 avgExecPrice;
        int256 pnl;
    }

    constructor(
        address _traderVault,
        address _risePool,
        address _market,
        address _positionHistory,
        address _positionVault
    ) PnlManager(_traderVault, _risePool, _market) {
        positionHistory = PositionHistory(_positionHistory);
        positionVault = PositionVault(_positionVault);
    }

    function _executeIncreasePosition(
        OrderRequest memory req,
        ExecutionContext memory ec
    ) internal {

        traderVault.decreaseTraderBalance(
            tx.origin,
            ec.marginAssetId,
            ec.marginAbs
        );

        req.isLong
            ? risePool.increaseLongReserveAmount(ec.marketId, ec.sizeAbs)
            : risePool.increaseShortReserveAmount(ec.marketId, ec.sizeAbs);

        if (ec.execType == OrderExecType.OpenPosition) {
            /// @dev for OpenPosition: PositionRecord => OpenPosition

            ec.positionRecordId = positionHistory.openPositionRecord(
                OpenPositionRecordParams(
                    tx.origin,
                    req.marketId,
                    ec.sizeAbs,
                    ec.avgExecPrice
                )
            );

            positionVault.updateOpenPosition(
                UpdatePositionParams(
                    ec.execType,
                    ec.key,
                    true, // isOpening
                    tx.origin,
                    req.isLong,
                    ec.positionRecordId,
                    req.marketId,
                    ec.avgExecPrice,
                    ec.sizeAbs,
                    ec.marginAbs,
                    req.isIncrease, // isIncreaseInSize
                    req.isIncrease // isIncreaseInMargin
                )
            );
        } else if (ec.execType == OrderExecType.IncreasePosition) {
            /// @dev for IncreasePosition: OpenPosition => PositionRecord

            ec.positionRecordId = ec.openPosition.currentPositionRecordId;

            positionVault.updateOpenPosition(
                UpdatePositionParams(
                    ec.execType,
                    ec.key,
                    false, // isOpening
                    tx.origin,
                    req.isLong,
                    ec.positionRecordId,
                    req.marketId,
                    ec.avgExecPrice,
                    ec.sizeAbs,
                    ec.marginAbs,
                    req.isIncrease, // isIncreaseInSize
                    req.isIncrease // isIncreaseInMargin
                )
            );

            positionHistory.updatePositionRecord(
                UpdatePositionRecordParams(
                    tx.origin,
                    ec.key,
                    ec.positionRecordId,
                    req.isIncrease,
                    ec.pnl,
                    ec.sizeAbs,
                    ec.avgExecPrice
                )
            );
        } else {
            revert("Invalid execution type");
        }
    }

    function _executeDecreasePosition(
        OrderRequest memory req,
        ExecutionContext memory ec
    ) internal {

        // PnL settlement
        ec.pnl = settlePnL(
            ec.openPosition,
            req.isLong,
            ec.avgExecPrice,
            req.marketId,
            ec.sizeAbs,
            ec.marginAbs // changing Leverage
        );

        ec.positionRecordId = ec.openPosition.currentPositionRecordId;

        if (ec.execType == OrderExecType.DecreasePosition) {
            positionVault.updateOpenPosition(
                UpdatePositionParams(
                    ec.execType,
                    ec.key,
                    false, // isOpening
                    tx.origin,
                    req.isLong,
                    ec.positionRecordId,
                    req.marketId,
                    ec.avgExecPrice,
                    ec.sizeAbs,
                    ec.marginAbs,
                    req.isIncrease, // isIncreaseInSize
                    req.isIncrease // isIncreaseInMargin // FIXME: not correct now
                )
            );

            positionHistory.updatePositionRecord(
                UpdatePositionRecordParams(
                    tx.origin,
                    ec.key,
                    ec.openPosition.currentPositionRecordId,
                    req.isIncrease,
                    ec.pnl,
                    ec.sizeAbs,
                    ec.avgExecPrice
                )
            );
        } else if (ec.execType == OrderExecType.ClosePosition) {
            // TODO: pay out margin if not requested as order request param

            positionVault.deleteOpenPosition(ec.key);

            positionHistory.closePositionRecord(
                ClosePositionRecordParams(
                    tx.origin,
                    ec.openPosition.currentPositionRecordId,
                    ec.pnl,
                    ec.sizeAbs,
                    ec.avgExecPrice
                )
            );
        } else {
            revert("Invalid execution type");
        }
    }
}
