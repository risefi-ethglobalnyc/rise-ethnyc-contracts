// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "./PriceManager.sol";

contract PriceMaster {
    PriceManager public priceManager;

    mapping(address => bool) public isPriceKeeper;

    modifier onlyPriceKeeper() {
        require(
            isPriceKeeper[msg.sender],
            "PriceManager: Should be called by keeper"
        );
        _;
    }

    constructor(
        address _priceManager,
        address _keeperAddress
    ) {
        priceManager = PriceManager(_priceManager);
        isPriceKeeper[_keeperAddress] = true;
    }

    function setPricesAndExecuteLimitOrders(
        uint256[] calldata _marketId,
        uint256[] calldata _price // new index price from the data source
    ) public onlyPriceKeeper {
        require(_marketId.length == _price.length, "PriceMaster: Wrong input");
        uint256 l = _marketId.length;
        for (uint256 i = 0; i < l; i++) {
            priceManager.setPrice(_marketId[i], _price[i]);

        }
    }
}
