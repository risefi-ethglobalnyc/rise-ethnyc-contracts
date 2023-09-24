// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {USDC_PRECISION} from "../common/constants.sol";

library OrderUtils {
    function _getPositionKey(
        address _account,
        bool _isLong,
        uint256 _marketId
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_account, _isLong, _marketId));
    }
}
