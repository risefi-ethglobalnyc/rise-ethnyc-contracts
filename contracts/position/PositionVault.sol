// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeCast.sol";

import "../common/structs.sol";
import "../common/params.sol";

import "./PositionUtils.sol";

contract PositionVault {
    using SafeCast for uint256;

    mapping(bytes32 => OpenPosition) public openPositions; // positionHash => Position

    mapping(uint256 => uint256) public maxLongCapacity; // marketId => tokenCount
    mapping(uint256 => uint256) public maxShortCapacity; // marketId => tokenCount // TODO: check - is it for stablecoins?


    function getPosition(
        bytes32 _key
    ) external view returns (OpenPosition memory) {
        return openPositions[_key];
    }

    function getPositionSize(bytes32 _key) external view returns (uint256) {
        return openPositions[_key].size;
    }

    function updateOpenPosition(UpdatePositionParams memory p) public {
        OpenPosition storage _position = openPositions[p._key];

        // trader, isLong, marketId
        if (p._isOpening) {
            _position.trader = p._trader;
            _position.isLong = p._isLong;
            _position.currentPositionRecordId = p._currentPositionRecordId;
            _position.marketId = p._marketId;
            _position.avgEntryFundingIndex = 0; // initialize as zero
        }

        if (p._sizeDeltaAbs > 0 && p._isIncreaseInSize) {
            _position.avgOpenPrice = PositionUtils._getNextAvgPrice(
                _position.size,
                _position.avgOpenPrice,
                p._sizeDeltaAbs,
                p._executionPrice
            );
        }
        _position.size = p._isIncreaseInSize
            ? _position.size + p._sizeDeltaAbs
            : _position.size - p._sizeDeltaAbs;

        _position.margin = p._isIncreaseInMargin
            ? _position.margin + p._marginDeltaAbs
            : _position.margin - p._marginDeltaAbs;

        _position.lastUpdatedTime = block.timestamp;
    }

    function deleteOpenPosition(bytes32 _key) external {
        delete openPositions[_key];
    }

    // TODO: onlyOperator
    function setMaxLongCapacity(
        uint256 _marketId,
        uint256 _tokenCount
    ) external {
        maxLongCapacity[_marketId] = _tokenCount;
    }

    // TODO: onlyOperator
    function setMaxShortCapacity(
        uint256 _marketId,
        uint256 _tokenCount
    ) external {
        maxShortCapacity[_marketId] = _tokenCount;
    }
}
