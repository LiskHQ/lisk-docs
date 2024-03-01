---
title: ... with Foundry
slug: /building-on-lisk/deploying-smart-contract/with-Foundry
description: "A guide on deploying a smart contract on the Lisk test network using Foundry. Includes instructions for setting up the environment, compiling, and deploying the smart contract."
keywords: [
    "Foundry",
    "smart contract",
    "ERC-20", "Lisk",
    "Lisk test network",
    "Lisk testnet",
    "Lisk Sepolia",
    "Node.js",
    "Solidity",
    "smart contract deployment",
    "deploy a smart contract",
    "deploying smart contracts",
    "build on lisk",
    "write smart contract",
    "smart contract development"
    ]
---

# Deploying a smart contract with Foundry

In this guide we discuss, the basics of [Foundry](https://book.getfoundry.sh/) development toolchain and will describe how to create and deploy a smart contract with Foundry to the **Lisk Sepolia** testnet.

Foundry is a powerful suite of tools to develop, test, and debug your smart contracts. It comprises several individual tools:

- `forge`: the main workhorse of Foundry — for developing, testing, compiling, and deploying smart contracts
- `cast`: a command-line tool for performing Ethereum RPC calls (e.g., interacting with contracts, sending transactions, and getting onchain data)
- `anvil`: a local testnet node, for testing contract behavior from a frontend or over RPC
- `chisel`: a Solidity [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop), for trying out Solidity snippets on a local or forked network


## Prerequisites
You need:

- A basic understanding of [Solidity](https://soliditylang.org/).
- This guide requires you have Foundry installed.
  - From the command-line (terminal), run: `curl -L https://foundry.paradigm.xyz | bash`
  - Then run `foundryup`, to install the latest (nightly) build of Foundry
For more information, see the Foundry Book [installation guide](https://book.getfoundry.sh/getting-started/installation).

<!-- ### Node v18+

This guide requires you to have Node version 18+ installed.

- Download [Node v18+](https://nodejs.org/en/download/)

If you are using `nvm` to manage your node versions, you can just run `nvm install 18`. -->

### Wallet funds

**Deploying contracts** to the blockchain requires a **gas fee**.
Therefore, you will need to fund your wallet with ETH to cover those gas fees.

For this guide, you will be deploying a contract to the Lisk Sepolia Testnet. 

You can deposit the required tokens by using the [Lisk Bridge](https://sepolia-bridge.lisk.com/bridge/lisk-sepolia-testnet).

In case your wallet doesn't hold enough `SepoliaETH`, use one of the available faucets for the **Ethereum Sepolia** Testnet like [https://sepoliafaucet.com](https://sepoliafaucet.com/) to receive free Testnet ETH.
Then, use the aforementioned Lisk Bridge to send tokens from the **Ethereum Sepolia Testnet** to the **Lisk Sepolia Testnet**.

## Creating a project
Before you can begin deploying smart contracts to Lisk, you need to set up your development environment by creating a Foundry project.

You can separately create a new directory and then initialize a Foundry project, or you can let Foundry create a directory and initiate a Foundry project by running the following command:

```bash
forge init foundry_app && cd foundry_app
```
This command will create a `foundry_app` and will change the terminal's directory to the aforementioned folder as well.

```text
Initializing /XYZ/L2/25/foundry_app/foundry_app...
Installing forge-std in /XYZ/L2/25/foundry_app/foundry_app/lib/forge-std (url: Some("https://github.com/foundry-rs/forge-std"), tag: None)
Cloning into '/XYZ/L2/25/foundry_app/foundry_app/lib/forge-std'...
remote: Enumerating objects: 2181, done.
remote: Counting objects: 100% (2177/2177), done.
remote: Compressing objects: 100% (737/737), done.
remote: Total 2181 (delta 1446), reused 2066 (delta 1373), pack-reused 4
Receiving objects: 100% (2181/2181), 614.11 KiB | 766.00 KiB/s, done.
Resolving deltas: 100% (1446/1446), done.
Submodule 'lib/ds-test' (https://github.com/dapphub/ds-test) registered for path 'lib/ds-test'
Cloning into '/XYZ/L2/25/foundry_app/foundry_app/lib/forge-std/lib/ds-test'...
remote: Enumerating objects: 313, done.        
remote: Counting objects: 100% (171/171), done.        
remote: Compressing objects: 100% (79/79), done.        
remote: Total 313 (delta 91), reused 132 (delta 83), pack-reused 142        
Receiving objects: 100% (313/313), 71.35 KiB | 521.00 KiB/s, done.
Resolving deltas: 100% (130/130), done.
    Installed forge-std v1.7.6
    Initialized forge project
```
By default, any application built with Foundry will have a similar directory structure to the following:

```bash
.
├── .github
├── lib
├── script
│   └── Counter.s.sol
├── src
│   └── Counter.sol
├── test
│   └── Counter.t.sol
├── .gitignore
├── .gitmodules
├── foundry.toml
└── README.md
```

For now, delete the files present in the `script/Counter.s.sol`, `src/Counter.sol` and `test/Counter.t.sol` as we will be creating a contract, relevant script and a test code ourselves in the following guide.

## Creating the contract
For ease and security, we’ll use the `ERC20` interface provided by the [OpenZeppelin Contracts library](https://docs.openzeppelin.com/contracts/5.x/erc20) to create a simple ERC-20 smart contract.
With OpenZeppelin, we don’t need to write the whole ERC-20 interface.
Instead, we can import the library contract and use its functions from the get go.

To add the OpenZeppelin Contracts library to your project, run:

```bash
forge install openzeppelin/openzeppelin-contracts
```
Inside the `src` folder, create a smart contract called `StakeContract.sol` and add the code below to the newly created file.

```sol title="src/StakeContract.sol"
// SPDX-License-Identifier : MIT
pragma solidity ^0.8.23;

import "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

error TransferFailed();

contract StakeContract{
    mapping (address => mapping(address => uint256)) public stakedBalances;

    function stake(uint256 amount, address token) external returns (bool) {
        stakedBalances[msg.sender][token] += amount;
        bool success = IERC20(token).transferFrom(msg.sender, address(this), amount);
        if(!success){
            revert TransferFailed();
        } else {
            return success;
        }
    }

    function getStakedBalance(){
      return stakedBalances;
    }
}   
```

The aforementioned is a very simple ERC-20 Staking contract. 
For the purpose of simplicity, users can use the `stake` function of the contract to stake their desired amount.
They can also then retrieve the details of amount staked to the contract by invoking the the contract also allows 

## Compiling the smart contract
To compile the contract using Foundry, simply run:

```bash
forge build
```
If the smart contract doesn't have any errors, you will see the following output on the terminal:

```text
[⠢] Compiling...
[⠰] Compiling 1 files with 0.8.24
[⠔] Solc 0.8.24 finished in 40.36ms
Compiler run successful!
```
## Configuring Foundry with Lisk

Next we will configure your Foundry project to deploy smart contracts to the Lisk network. First we'll store your private key in an encrypted keystore, then we'll add Lisk as a network.

### Storing your private key

The following command will import your private key to Foundry's secure keystore. You will be prompted to enter your private key, as well as a password for signing transactions:

```bash
cast wallet import deployer --interactive
```

<!-- :::caution

For instructions on how to get your private key from Coinbase Wallet, visit the [Coinbase Wallet documentation](https://docs.cloud.coinbase.com/wallet-sdk/docs/developer-settings#show-private-key). **It is critical that you do NOT commit this to a public repo**. 

:::-->

Run this command to confirm that the 'deployer' account is setup in Foundry:

```bash
cast wallet list
```

### Adding Lisk as a network

Now create a `.env` file in the home directory of your project to add the Lisk network and an API key for verifying your contract on Blockscout:

```
LISK_SEPOLIA_RPC="https://rpc.sepolia-api.lisk.com"
ETHERSCAN_API_KEY="PLACEHOLDER_STRING"
```

Note that even though we're using Basescan as our block explorer, Foundry expects the API key to be defined as `ETHERSCAN_API_KEY`.

:::info

When verifying a contract with Basescan on testnet (Sepolia), an API key is not required. You can leave the value as `PLACEHOLDER_STRING`. On mainnet, you can get your Basescan API key from [here](https://basescan.org/myapikey) after you sign up for an account.

:::

### Loading environment variables

Now that you've created the above `.env` file, run the following command to load the environment variables in the current command line session:

```bash
source .env
```

## Deploying the smart contract

With your contract compiled and your environment configured, you are ready to deploy to the Lisk Sepolia test network!

Today we'll use the `forge create` command, which is a straightforward way to deploy a single contract at a time. In the future, you may want to look into [`forge script`](https://book.getfoundry.sh/tutorials/solidity-scripting), which enables scripting onchain transactions and deploying more complex smart contract projects.

You'll need testnet ETH in your wallet. See the [prerequisites](#prerequisites) if you haven't done that yet. Otherwise, the deployment attempt will fail.

To deploy the contract to the Lisk Sepolia test network, run the following command. You will be prompted to enter the password that you set earlier, when you imported your private key:

```bash
forge create ./src/NFT.sol:NFT --rpc-url $LISK_SEPOLIA_RPC --account deployer
```

The contract will be deployed on the Lisk Sepolia test network. You can view the deployment status and contract by using a [block explorer](/tools/block-explorers) and searching for the address returned by your deploy script. If you've deployed an exact copy of the NFT contract above, it will already be verified and you'll be able to read and write to the contract using the web interface.

<!-- :::info

If you'd like to deploy to mainnet, you'll modify the command like so:

```bash
forge create ./src/NFT.sol:NFT --rpc-url $BASE_MAINNET_RPC --account deployer
```

::: -->

Regardless of the network you're deploying to, if you're deploying a new or modified contract, you'll need to verify it.


## Verifying the Smart Contract

In web3, it's considered best practice to verify your contracts so that users and other developers can inspect the source code, and be sure that it matches the deployed bytecode on the blockchain.

Further, if you want to allow others to interact with your contract using the block explorer, it first needs to be verified. The above contract has already been verified, so you should be able to view your version on a block explorer already, but we'll still walk through how to verify a contract on Lisk Sepolia testnet.

:::info

When verifying a contract with blockscout on testnet (Sepolia), an API key is not required. You can leave the value as `PLACEHOLDER_STRING`.
<!-- On mainnet, you can get your Basescan API key from [here](https://basescan.org/myapikey) after you sign up for an account. -->

:::

Grab the deployed address and run:

```bash
forge verify-contract <DEPLOYED_ADDRESS> ./src/NFT.sol:NFT --chain 84532 --watch
```

You should see an output similar to:

```
Start verifying contract `0x71bfCe1172A66c1c25A50b49156FAe45EB56E009` deployed on base-sepolia

Submitting verification for [src/NFT.sol:NFT] 0x71bfCe1172A66c1c25A50b49156FAe45EB56E009.
Submitted contract for verification:
        Response: `OK`
        GUID: `3i9rmtmtyyzkqpfvy7pcxj1wtgqyuybvscnq8d7ywfuskss1s7`
        URL:
        https://sepolia.basescan.org/address/0x71bfce1172a66c1c25a50b49156fae45eb56e009
Contract verification status:
Response: `NOTOK`
Details: `Pending in queue`
Contract verification status:
Response: `OK`
Details: `Pass - Verified`
Contract successfully verified
```

Search for your contract on [Basescan](https://sepolia.basescan.org/) to confirm it is verified.

:::info

You can't re-verify a contract identical to one that has already been verified. If you attempt to do so, such as verifying the above contract, you'll get an error similar to:

```text
Start verifying contract `0x71bfCe1172A66c1c25A50b49156FAe45EB56E009` deployed on base-sepolia

Contract [src/NFT.sol:NFT] "0x71bfCe1172A66c1c25A50b49156FAe45EB56E009" is already verified. Skipping verification.
```

:::

## Interacting with the Smart Contract

If you verified on Basescan, you can use the `Read Contract` and `Write Contract` sections under the `Contract` tab to interact with the deployed contract. To use `Write Contract`, you'll need to connect your wallet first, by clicking the `Connect to Web3` button (sometimes this can be a little finicky, and you'll need to click `Connect` twice before it shows your wallet is successfully connected).

To practice using the `cast` command-line tool which Foundry provides, we'll perform a call without publishing a transaction (a read), then sign and publish a transaction (a write).

### Performing a call

A key component of the Foundry toolkit, `cast` enables us to interact with contracts, send transactions, and get onchain data using Ethereum RPC calls. First we will perform a call from your account, without publishing a transaction.

From the command-line, run:

```bash
cast call <DEPLOYED_ADDRESS> --rpc-url $BASE_SEPOLIA_RPC "balanceOf(address)" <YOUR_ADDRESS_HERE>
```

You should receive `0x0000000000000000000000000000000000000000000000000000000000000000` in response, which equals `0` in hexadecimal. And that makes sense — while you've deployed the NFT contract, no NFTs have been minted yet and therefore your account's balance is zero.

### Signing and publishing a transaction

Now let's sign and publish a transaction, calling the `mint(address)` function on the NFT contract we just deployed.

Run the following command:

```bash
cast send <DEPLOYED_ADDRESS> --rpc-url=$BASE_SEPOLIA_RPC "mint(address)" <YOUR_ADDRESS_HERE> --account deployer
```

:::info

Note that in this `cast send` command, we had to include our private key, but this is not required for `cast call`, because that's for calling view-only contract functions and therefore we don't need to sign anything.

:::

If successful, Foundry will respond with information about the transaction, including the `blockNumber`, `gasUsed`, and `transactionHash`.

Finally, let's confirm that we did indeed mint ourselves one NFT. If we run the first `cast call` command again, we should see that our balance increased from 0 to 1:

```bash
cast call <DEPLOYED_ADDRESS> --rpc-url $BASE_SEPOLIA_RPC "balanceOf(address)" <YOUR_ADDRESS_HERE>
```

And the response: `0x0000000000000000000000000000000000000000000000000000000000000001` (`1` in hex) — congratulations, you deployed a contract and minted an NFT with Foundry!

## Conclusion

Phew, that was a lot! We learned how to setup a project, deploy to Base, and interact with our smart contract using Foundry. The process is the same for real networks, just more expensive — and of course, you'll want to invest time and effort testing your contracts, to reduce the likelihood of user-impacting bugs before deploying.

For all things Foundry, check out the [Foundry book](https://book.getfoundry.sh/), or head to the official Telegram [dev chat](https://t.me/foundry_rs) or [support chat](https://t.me/foundry_support).
