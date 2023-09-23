// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./MarketOrder.sol";

contract OrderRouter {
    MarketOrder marketOrder;

    constructor(address _marketOrder) {
        marketOrder = MarketOrder(_marketOrder);
    }

    function _validateOrder(OrderRequest calldata req) internal view {
        require(
            msg.sender != address(0),
            "OrderRouter: Invalid sender address"
        );
        require(
            msg.sender == tx.origin,
            "OrderRouter: Invalid sender address (contract)"
        );
        require(req.sizeAbs >= 0, "OrderRouter: Invalid size");
        require(req.marginAbs >= 0, "OrderRouter: Invalid margin size");
    }

    function placeMarketOrder(
        OrderRequest calldata req
    ) external returns (bytes32) {
        _validateOrder(req);
        return marketOrder.executeMarketOrder(req);
    }
}
