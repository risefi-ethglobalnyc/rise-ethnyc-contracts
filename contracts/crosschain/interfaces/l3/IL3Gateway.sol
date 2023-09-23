// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IL3Gateway {
    function increaseTraderBalance(
        address _trader,
        uint256 _assetId,
        uint256 _amount
    ) external;

    function withdrawAssetToL2(
        address _trader,
        uint256 _assetId,
        uint256 _amount
    ) external;

}
