// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {USDC_PRECISION} from "../common/constants.sol";

library OrderUtils {
    function _usdToToken(
        uint256 _usdAmount,
        uint256 _tokenPrice,
        uint256 _tokenDecimals
    ) public pure returns (uint256) {
        return (_usdAmount * 10 ** _tokenDecimals) / _tokenPrice;
    }

    function _tokenToUsd(
        uint256 _tokenAmount,
        uint256 _tokenPrice,
        uint256 _tokenDecimals
    ) public pure returns (uint256) {
        return ((_tokenAmount * _tokenPrice)) / 10 ** _tokenDecimals;
    }

    function _getPositionKey(
        address _account,
        bool _isLong,
        uint256 _marketId
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_account, _isLong, _marketId));
    }
}
