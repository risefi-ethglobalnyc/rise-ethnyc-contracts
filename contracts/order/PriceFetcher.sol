// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../price/PriceManager.sol";

// Simple Router for PriceManager

contract PriceFetcher {
    PriceManager public priceManager;

    constructor(address _priceManager) {
        priceManager = PriceManager(_priceManager);
    }

    function _getAvgExecPrice(
        uint256 _marketId,
        uint256 _size,
        bool _isLong
    ) external view returns (uint256) {

        return priceManager.getAvgExecPrice(_marketId, _size, _isLong);
    }

    function _getMarkPrice(uint256 _marketId) external view returns (uint256) {
        return priceManager.getMarkPrice(_marketId);
    }

    function _getIndexPrice(uint256 _marketId) external view returns (uint256) {
        return priceManager.getIndexPrice(_marketId);
    }

    function _getPriceBuffer(uint256 _marketId) external view returns (int256) {
        return priceManager.getPriceBuffer(_marketId);
    }
}
