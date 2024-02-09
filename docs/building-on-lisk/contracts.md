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
    'Lisk Sepolia Testnet',
    'Predeploy',
  ]

---

# Contracts
A reference page containing information about all the contracts deployed on different networks.

## Ethereum Sepolia Testnet

The following L1 contracts have been deployed to the **Ethereum Sepolia Testnet**.

| Name                              | Value                                      | Description |
| :--------------                   | :----------------------------------------  |:----------  |
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


## Lisk Sepolia Testnet

All L2 contracts are predeployed into the genesis block on the Lisk Sepolia Testnet.
For more information on each contract, see [Predeploy's README](https://github.com/ethereum-optimism/specs/blob/main/specs/protocol/predeploys.md).