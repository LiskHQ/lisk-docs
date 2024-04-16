---
id: contracts
title: Contracts
sidebar_position: 1
slug: /contracts
description: 'A reference page listing all the contracts deployed concerning Lisk.'
keywords:
  [
    'Lisk',
    'Ethereum Sepolia Testnet',
    'Contracts',
    'L1',
    'L2',
    'Lisk Sepolia Testnet',
    'Predeployed',
  ]
---

# Contracts
A reference page containing information about all the contracts deployed on different networks.

## Testnet

### Ethereum Sepolia (L1)

The following L1 contracts have been deployed to the **Ethereum Sepolia Testnet**.

| Name of Contract                  | Contract Address                           | Description |
| :--------------                   | :----------------------------------------  |:----------  |
| **Batcher**                | [0x246E119a5BcC2875161b23E4e602e25cEcE96E37](https://sepolia.etherscan.io/address/0x246E119a5BcC2875161b23E4e602e25cEcE96E37) | The Batcher is a service that publishes transactions from the Sequencer to the L1 blockchain. The Batcher runs continuously alongside the Sequencer and publishes transactions in batches (hence the name) on a regular basis.                                         |
| **L1ERC721Bridge**                | [0xb4E988CF1aD8C361D56118437502A8f11C7FaA01](https://sepolia.etherscan.io/address/0xb4E988CF1aD8C361D56118437502A8f11C7FaA01) | Handles the sending and receiving of messages between L1 and L2.                                         |
| **L1CrossDomainMessenger**        | [0x857824E6234f7733ecA4e9A76804fd1afa1A3A2C](https://sepolia.etherscan.io/address/0x857824E6234f7733ecA4e9A76804fd1afa1A3A2C) | Sends messages from L1 to L2 and relays messages from L2 onto L1.                                       |
| **L1StandardBridge**              | [0x1Fb30e446eA791cd1f011675E5F3f5311b70faF5](https://sepolia.etherscan.io/address/0x1Fb30e446eA791cd1f011675E5F3f5311b70faF5) | It is the main entry point to deposit ERC20 tokens from L1 to L2. This contract can store any token.     |
| **L2OutputOracle**                | [0xA0E35F56C318DE1bD5D9ca6A94Fe7e37C5663348](https://sepolia.etherscan.io/address/0xA0E35F56C318DE1bD5D9ca6A94Fe7e37C5663348) | Contains a list of proposed state roots which Proposers assert to be a result of block execution.        |
| **ProxyAdmin**                    | [0x5Db9F05921d8d5a6a157F6f49c411cc0e46c6330](https://sepolia.etherscan.io/address/0x5Db9F05921d8d5a6a157F6f49c411cc0e46c6330) | Owner of AddressManager. Admin of LiskPortal, SystemConfig, L2OutputOracle, L1StandardBridge.             |
| **SystemConfig**                   | [0xF54791059df4a12BA461b881B4080Ae81a1d0AC0](https://sepolia.etherscan.io/address/0xF54791059df4a12BA461b881B4080Ae81a1d0AC0) | It contains configuration parameters such as the Sequencer address, the L2 gas limit, and the unsafe block signer address. |
| **AddressManager**                | [0x27Bb4A7cd8FB20cb816BF4Aac668BF841bb3D5d3](https://sepolia.etherscan.io/address/0x27Bb4A7cd8FB20cb816BF4Aac668BF841bb3D5d3) | The Address Manager is a built-in actor that manages Ethereum's address space. |
| **OptimismPortal**                | [0xe3d90F21490686Ec7eF37BE788E02dfC12787264](https://sepolia.etherscan.io/address/0xe3d90F21490686Ec7eF37BE788E02dfC12787264) | It is the main entry point to deposit funds from L1 to L2. It also allows proving and finalizing withdrawals. |
| **ProtocolVersions**              | [0x1Bb17EB31bDdFd30F63D4FAe6c8Eb85D9e9b1f48](https://sepolia.etherscan.io/address/0x1Bb17EB31bDdFd30F63D4FAe6c8Eb85D9e9b1f48) | It is used to manage superchain protocol version information. |
| **OptimismMintableERC20Factory**  | [0x269d632C1E518a922C30C749cFD3f82Eb5C779B0](https://sepolia.etherscan.io/address/0x269d632C1E518a922C30C749cFD3f82Eb5C779B0) | It is responsible for creating ERC20 contracts on L2 that can be used for depositing native L1 tokens into. |


### Lisk Sepolia (L2)

All L2 contracts deployed on the **Lisk Sepolia Testnet** are Predeploys.
A predeployed contract is included in the L2 genesis state, and it exists from the very beginning of the blockchain.
On Lisk Network, these contracts are located at specific addresses that are determined in advance and are part of the genesis state.
For more information on Predeploys, see [Predeploys' README](https://github.com/ethereum-optimism/specs/blob/main/specs/protocol/predeploys.md).

| Name of Contract                  | Contract Address                           | 
| :--------------                   | :----------------------------------------  |
| [**ERC-4337 Entrypoint**](https://github.com/ethereum-optimism/specs/blob/main/specs/protocol/preinstalls.md#erc-4337-entrypoint)  | [0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789](https://sepolia-blockscout.lisk.com/address/0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789) 
| [**LegacyMessagePasser**](https://github.com/ethereum-optimism/specs/blob/main/specs/protocol/predeploys.md#legacymessagepasser)  | [0x4200000000000000000000000000000000000000](https://sepolia-blockscout.lisk.com/address/0x4200000000000000000000000000000000000000) |
| [**DeployerWhitelist**](https://github.com/ethereum-optimism/specs/blob/main/specs/protocol/predeploys.md#deployerwhitelist)       | [0x4200000000000000000000000000000000000002](https://sepolia-blockscout.lisk.com/address/0x4200000000000000000000000000000000000002) |
| [**LegacyERC20ETH**](https://github.com/ethereum-optimism/specs/blob/main/specs/protocol/predeploys.md#legacyerc20eth)                | [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://sepolia-blockscout.lisk.com/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000) |
| [**WETH9**](https://github.com/ethereum-optimism/specs/blob/main/specs/protocol/predeploys.md#weth9)        | [0x4200000000000000000000000000000000000006](https://sepolia-blockscout.lisk.com/address/0x4200000000000000000000000000000000000006) |
| [**L2CrossDomainMessenger**](https://github.com/ethereum-optimism/specs/blob/main/specs/protocol/predeploys.md#l2crossdomainmessenger)  | [0x4200000000000000000000000000000000000007](https://sepolia-blockscout.lisk.com/address/0x4200000000000000000000000000000000000007) |
| [**L2StandardBridge**](https://github.com/ethereum-optimism/specs/blob/main/specs/protocol/predeploys.md#l2standardbridge)        | [0x4200000000000000000000000000000000000010](https://sepolia-blockscout.lisk.com/address/0x4200000000000000000000000000000000000010) |
| [**SequencerFeeVault**](https://github.com/ethereum-optimism/specs/blob/main/specs/protocol/predeploys.md#sequencerfeevault) | [0x4200000000000000000000000000000000000011](https://sepolia-blockscout.lisk.com/address/0x4200000000000000000000000000000000000011) |
| [**OptimismMintableERC20Factory**](https://github.com/ethereum-optimism/specs/blob/main/specs/protocol/predeploys.md#optimismmintableerc20factory)        | [0x4200000000000000000000000000000000000012](https://sepolia-blockscout.lisk.com/address/0x4200000000000000000000000000000000000012) |
| [**L1BlockNumber**](https://github.com/ethereum-optimism/specs/blob/main/specs/protocol/predeploys.md#l1blocknumber)                | [0x4200000000000000000000000000000000000013](https://sepolia-blockscout.lisk.com/address/0x4200000000000000000000000000000000000013) |
| [**GasPriceOracle**](https://github.com/ethereum-optimism/specs/blob/main/specs/protocol/predeploys.md#gaspriceoracle)        | [0x420000000000000000000000000000000000000F](https://sepolia-blockscout.lisk.com/address/0x420000000000000000000000000000000000000F) |
| **GovernanceToken**                | [0x4200000000000000000000000000000000000042](https://sepolia-blockscout.lisk.com/address/0x4200000000000000000000000000000000000042) |
| [**L1Block**](https://github.com/ethereum-optimism/specs/blob/main/specs/protocol/predeploys.md#l1block)        | [0x4200000000000000000000000000000000000015](https://sepolia-blockscout.lisk.com/address/0x4200000000000000000000000000000000000015) |                                        |
| [**L2ToL1MessagePasser**](https://github.com/ethereum-optimism/specs/blob/main/specs/protocol/predeploys.md#l2tol1messagepasser)                | [0x4200000000000000000000000000000000000016](https://sepolia-blockscout.lisk.com/address/0x4200000000000000000000000000000000000016) |
| **L2ERC721Bridge**        | [0x4200000000000000000000000000000000000014](https://sepolia-blockscout.lisk.com/address/0x4200000000000000000000000000000000000014) |
| [**OptimismMintableERC721Factory**](https://github.com/ethereum-optimism/specs/blob/main/specs/protocol/predeploys.md#optimismmintableerc721factory)                | [0x4200000000000000000000000000000000000017](https://sepolia-blockscout.lisk.com/address/0x4200000000000000000000000000000000000017) |
| [**ProxyAdmin**](https://github.com/ethereum-optimism/specs/blob/main/specs/protocol/predeploys.md#proxyadmin)        | [0x4200000000000000000000000000000000000018](https://sepolia-blockscout.lisk.com/address/0x4200000000000000000000000000000000000018) |
| [**BaseFeeVault**](https://github.com/ethereum-optimism/specs/blob/main/specs/protocol/predeploys.md#basefeevault)                | [0x4200000000000000000000000000000000000019](https://sepolia-blockscout.lisk.com/address/0x4200000000000000000000000000000000000019) |
| [**L1FeeVault**](https://github.com/ethereum-optimism/specs/blob/main/specs/protocol/predeploys.md#l1feevault)        | [0x420000000000000000000000000000000000001a](https://sepolia-blockscout.lisk.com/address/0x420000000000000000000000000000000000001A) |
| [**SchemaRegistry**](https://github.com/ethereum-optimism/specs/blob/main/specs/protocol/predeploys.md#schemaregistry)                | [0x4200000000000000000000000000000000000020](https://sepolia-blockscout.lisk.com/address/0x4200000000000000000000000000000000000020) |
| [**EAS**](https://github.com/ethereum-optimism/specs/blob/main/specs/protocol/predeploys.md#eas)        | [0x4200000000000000000000000000000000000021](https://sepolia-blockscout.lisk.com/address/0x4200000000000000000000000000000000000021) |
| [**create2Deployer**](https://github.com/ethereum-optimism/specs/blob/main/specs/protocol/predeploys.md#create2deployer)                | [0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2](https://sepolia-blockscout.lisk.com/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2) |
