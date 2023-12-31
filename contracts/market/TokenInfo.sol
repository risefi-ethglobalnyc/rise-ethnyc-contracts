// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../common/structs.sol";

import "./Market.sol";

contract TokenInfo {
    Market public market;
    uint256 public globalTokenIdCounter;

    mapping(address => uint256) private tokenAddressToAssetId;
    mapping(uint256 => TokenData) private assetIdToTokenData;

    constructor(address _market) {
        market = Market(_market);
    }

    function getTokenData(
        uint256 _assetId
    ) public view returns (TokenData memory) {
        return assetIdToTokenData[_assetId];
    }

    function getTokenDecimals(uint256 _assetId) public view returns (uint256) {
        return getTokenData(_assetId).decimals;
    }

    function getAssetIdFromTokenAddress(
        address _tokenAddress
    ) public view returns (uint256) {
        return tokenAddressToAssetId[_tokenAddress];
    }

    function getTokenAddressFromAssetId(
        uint256 _assetId
    ) public view returns (address) {
        return getTokenData(_assetId).tokenAddress;
    }

    function getSizeToPriceBufferDeltaMultiplier(
        uint256 _assetId
    ) public view returns (uint256) {
        return getTokenData(_assetId).sizeToPriceBufferDeltaMultiplier;
    }

    // TODO: PriceManager 등에서 호출하는 패턴 고려
    function setSizeToPriceBufferDeltaMultiplier(
        uint256 _assetId,
        uint256 _multiplier
    ) external {
        TokenData storage tokenData = assetIdToTokenData[_assetId];
        tokenData.sizeToPriceBufferDeltaMultiplier = _multiplier;
    }

    // TODO: onlyAdmin
    // TODO: check- to store token ticker and name in the contract storage?
    function registerToken(
        // FIXME: make it possible to set assetId manually with a parameter (not using global counter)
        address _tokenAddress,
        uint256 _tokenDecimals
    ) external {
        uint256 assetId = globalTokenIdCounter;
        TokenData storage tokenData = assetIdToTokenData[assetId];
        tokenData.decimals = _tokenDecimals;
        tokenAddressToAssetId[_tokenAddress] = assetId;
        tokenData.tokenAddress = _tokenAddress;

        globalTokenIdCounter++;
    }

    function getBaseTokenDecimals(
        uint256 _marketId
    ) external view returns (uint256) {
        MarketInfo memory marketInfo = market.getMarketInfo(_marketId);
        return getTokenDecimals(marketInfo.baseAssetId);
    }

    function getBaseTokenSizeToPriceBufferDeltaMultiplier(
        uint256 _marketId
    ) external view returns (uint256) {
        MarketInfo memory marketInfo = market.getMarketInfo(_marketId);
        return getSizeToPriceBufferDeltaMultiplier(marketInfo.baseAssetId);
    }
}
