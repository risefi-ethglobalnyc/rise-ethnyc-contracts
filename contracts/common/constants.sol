// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

uint256 constant USDC_ID = 0;
uint256 constant ETH_ID = 1;

uint256 constant USDC_PRECISION = 1e20; // FIXME: to 1e6?
uint256 constant TOKEN_SIZE_PRECISION = 1e18; // FIXME: 토큰별로 다르게 지정?

uint256 constant PARTIAL_RATIO_PRECISION = 1e8;

uint256 constant PRICE_BUFFER_PRECISION = 1e10;
uint256 constant SIZE_TO_PRICE_BUFFER_PRECISION = 1e10;
uint256 constant PRICE_BUFFER_DELTA_MULTIPLIER_PRECISION = 1e10; // FIXME: 이 상수를 쓰는 곳 점검해보기
