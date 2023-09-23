// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

enum OrderType {
    Market,
    Limit,
    StopMarket,
    StopLimit
}

enum OrderExecType {
    OpenPosition,
    IncreasePosition,
    DecreasePosition,
    ClosePosition
}
