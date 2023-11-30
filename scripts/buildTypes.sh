#!/bin/bash

npx typechain \
    --target ethers-v6 \
    --out-dir ./src/types \
    src/artifacts/LSP8DropsDigitalAsset.json \
    ./node_modules/@erc725/smart-contracts/artifacts/ERC725Y.json \
    ./node_modules/@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json \
    ./node_modules/@lukso/lsp-smart-contracts/artifacts/LSP7MintableInit.json \
    ./node_modules/@lukso/lsp-smart-contracts/artifacts/LSP8Mintable.json \
    ./node_modules/@lukso/lsp-smart-contracts/artifacts/LSP8MintableInit.json \
    ./node_modules/@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json \
    ./node_modules/@lukso/lsp-smart-contracts/artifacts/LSP16UniversalFactory.json