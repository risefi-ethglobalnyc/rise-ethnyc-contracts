// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract TraderVault {
    mapping(address => mapping(uint256 => uint256)) public traderBalances; // userAddress => assetId => Balance
    mapping(address => uint256) public traderOrderRecordCounts; // userAddress => orderCount
    mapping(address => uint256) public traderPositionRecordCounts; // userAddress => positionCount

    // TODO: onlyManager
    function increaseTraderBalance(
        address _trader,
        uint256 _assetId,
        uint256 _amount
    ) external {
        traderBalances[_trader][_assetId] += _amount;
    }

    // TODO: onlyManager
    function decreaseTraderBalance(
        address _trader,
        uint256 _assetId,
        uint256 _amount
    ) external {
        traderBalances[_trader][_assetId] -= _amount;
    }

    function getTraderBalance(
        address _trader,
        uint256 _assetId
    ) external view returns (uint256) {
        return traderBalances[_trader][_assetId];
    }

    // onlyOrderHistory
    function getTraderOrderRecordCount(
        address _trader
    ) external view returns (uint256) {
        return traderOrderRecordCounts[_trader];
    }

    // onlyOrderHistory
    function setTraderOrderRecordCount(
        address _trader,
        uint256 _count
    ) external {
        traderOrderRecordCounts[_trader] = _count;
    }

    // onlyPositionHistory
    function getTraderPositionRecordCount(
        address _trader
    ) external view returns (uint256) {
        return traderPositionRecordCounts[_trader];
    }

    // onlyPositionHistory
    function setTraderPositionRecordCount(
        address _trader,
        uint256 _count
    ) external {
        traderPositionRecordCounts[_trader] = _count;
    }
}
