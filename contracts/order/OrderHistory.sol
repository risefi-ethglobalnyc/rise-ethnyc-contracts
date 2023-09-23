// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../common/structs.sol";
import "../common/params.sol";
import "../common/enums.sol";

import "../account/TraderVault.sol";

contract OrderHistory {
    TraderVault public traderVault; // TODO: check - the pattern?

    mapping(address => mapping(uint256 => OrderRecord)) public orderRecords; // userAddress => traderOrderRecordId => OrderRecord (filled orders by trader)

    constructor(address _traderVault) {
        traderVault = TraderVault(_traderVault);
    }

    function createOrderRecord(CreateOrderRecordParams memory p) external {
        // use orderCount as orderRecordId
        uint256 traderOrderRecordCount = traderVault.getTraderOrderRecordCount(
            p._trader
        );

        orderRecords[p._trader][traderOrderRecordCount] = OrderRecord(
            p._orderType,
            p._isLong,
            p._isIncrease,
            p._positionRecordId,
            p._marketId,
            p._sizeAbs,
            p._marginAbs,
            p._executionPrice,
            block.timestamp
        );

        traderVault.setTraderOrderRecordCount(
            p._trader,
            traderOrderRecordCount + 1
        );
    }
}
