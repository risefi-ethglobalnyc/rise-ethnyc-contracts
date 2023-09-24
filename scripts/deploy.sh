#!/bin/sh

HERE=$(dirname $(realpath $0))

npx hardhat run $HERE/deploy/check_deployer.ts --network mantle_testnet
npx hardhat run $HERE/deploy/deploy_libraries.ts --network mantle_testnet
# npx hardhat run $HERE/deploy/deploy_l2.ts --network l2testnet
npx hardhat run $HERE/deploy/deploy_l3.ts --network mantle_testnet