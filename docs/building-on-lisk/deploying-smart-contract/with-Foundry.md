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

<details>
<summary>Console output</summary>
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
</details>

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

### **Creating** the smart contract
For ease and security, we’ll use the `ERC20` interface provided by the [OpenZeppelin Contracts library](https://docs.openzeppelin.com/contracts/5.x/erc20) to create a simple ERC-20 smart contract.
With OpenZeppelin, we don’t need to write the whole ERC-20 interface.
Instead, we can import the library contract and use its functions from the get go.

To add the OpenZeppelin Contracts library to your project, run:

```bash
forge install openzeppelin/openzeppelin-contracts
```
Inside the `src` folder, create a smart contract called `StakeContract.sol` and add the code below to the newly created file.

```sol title="src/StakeContract.sol"
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";

contract NFT is ERC721 {
    uint256 public currentTokenId;

    constructor() ERC721("Lisk", "LSK") {}

    function mint(address recipient) public payable returns (uint256) {
        uint256 newItemId = ++currentTokenId;
        _safeMint(recipient, newItemId);
        return newItemId;
    }
}
```

<!-- The aforementioned is a very simple ERC-20 Staking contract. 
For the purpose of simplicity, users can use the `stake` function of the contract to stake their desired amount.
They can also then retrieve the details of amount staked to the contract by invoking the the contract also allows  -->

### **Compiling** the smart contract
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

### **Deploying** the smart contract

You can now deploy the smart contract to Lisk.
For this example, we will use the Lisk Sepolia network to deploy the Hello contract.

Add the `--verify` flag to the `forge create` command to directly verify the smart contract on BlockScout.


```bash
forge create --rpc-url https://rpc.sepolia-api.lisk.com \                                                                                                                                                ─╯
--etherscan-api-key 123 \
--verify \
--verifier blockscout \
--verifier-url https://sepolia-blockscout.lisk.com/api \
--private-key <PRIVATE_KEY> \
src/NFT.sol:NFT
```

If the deployment went successfully, the output should look like this:

```text
The aforementioned command will first deploy the contract and display the following output:

// highlight-start
[⠒] Compiling...
No files changed, compilation skipped
Deployer: 0x5e1A92F84cA1CE280B3Cb29d79C3368f45b41EBB
Deployed to: 0x108872F713A27bc22ca1db8CEefCAC8CbeDdF9E5
Transaction hash: 0xf465528f43e5cbc9b5206e46048feba0b920179813c3eb8c3bdbccbfd13d731e
// highlight-end

Once the contract is deployed successfully, the above mentioned command will verify the contract as well!

// highlight-start
Starting contract verification...
Waiting for blockscout to detect contract deployment...
Start verifying contract `0x108872F713A27bc22ca1db8CEefCAC8CbeDdF9E5` deployed on 4202

Submitting verification for [src/NFT.sol:NFT] 0x108872F713A27bc22ca1db8CEefCAC8CbeDdF9E5.
Submitted contract for verification:
        Response: `OK`
        GUID: `108872f713a27bc22ca1db8ceefcac8cbeddf9e565e71790`
        URL: https://sepolia-blockscout.lisk.com/address/0x108872f713a27bc22ca1db8ceefcac8cbeddf9e5
Contract verification status:
Response: `OK`
Details: `Pending in queue`
Contract verification status:
Response: `OK`
Details: `Pass - Verified`
Contract successfully verified
// highlight-end
```

After the smart contract is deployed, you can interact with it by calling its public functions.

### **Verifying** the smart contract

Each deployed contract, should be verified so that users and other developers can inspect the source code, and be sure that it matches the deployed bytecode on the blockchain.
Verification of a contract is also required 
<!-- In web3, it's considered best practice to verify your contracts so that users and other developers can inspect the source code, and be sure that it matches the deployed bytecode on the blockchain. -->

Further, if you want to allow others to interact with your contract using the block explorer, it first needs to be verified.
The above contract has already been verified, so you should be able to view your version on a block explorer already, but we'll still walk through how to verify a contract on Lisk Sepolia testnet.

Grab the deployed address and run:

```bash
forge verify-contract <CONTRACT_ADDRESS> ./src/<NAME_OF_CONTRACT.sol>:<TOKEN_NAME> --chain 4202 --watch --verifier blockscout --verifier-url https://sepolia-blockscout.lisk.com/api
```

You should see an output similar to:

 ```
Starting contract verification...
Waiting for blockscout to detect contract deployment...
Start verifying contract `0xcCaA1C3eb8FEb5b09a5Eac1359BC4c70E18e29d9` deployed on 4202

Submitting verification for [src/NFT.sol:NFT] 0xcCaA1C3eb8FEb5b09a5Eac1359BC4c70E18e29d9.
Submitted contract for verification:
        Response: `OK`
        GUID: `ccaa1c3eb8feb5b09a5eac1359bc4c70e18e29d965e5c95a`
        URL: https://sepolia-blockscout.lisk.com/address/0xccaa1c3eb8feb5b09a5eac1359bc4c70e18e29d9
Contract verification status:
Response: `OK`
Details: `Pending in queue`
Contract verification status:
Response: `OK`
Details: `Pass - Verified`
Contract successfully verified
```

Search for your contract on [Blockscout](https://sepolia-blockscout.lisk.com/) to confirm it is verified.


:::info

You can't re-verify a contract identical to one that has already been verified. If you attempt to do so, such as verifying the above contract, you'll get an error similar to:

```text
Start verifying contract `0xcCaA1C3eb8FEb5b09a5Eac1359BC4c70E18e29d9` deployed on 4202

Contract [src/NFT.sol:NFT] "0xcCaA1C3eb8FEb5b09a5Eac1359BC4c70E18e29d9" is already verified. Skipping verification.
``` 
:::

### **Testing** the smart contract

By testing the smart contract, you can verify that the smart contract behaves as expected and that it is free of bugs, before deploying it to Lisk.

Foundry provides a testing framework to support you in writing tests for smart contracts.
See [Tests - Foundry Book](https://book.getfoundry.sh/forge/tests) for examples and references regarding the testing framework.

To test the Hello smart contract, create a new file `Hello.t.sol` under `test/`, and add the following content:

```solidity title="foundry_app/test/NFT.t.sol"
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {NFT} from "../src/NFT.sol";

contract NFTTest is Test {

    NFT public lsk;
    address alice = makeAddr("alice");
    address bob = makeAddr("bob");

    function setUp() public{
        lsk = new NFT();
    }

    function testMintPass() public {
        lsk.mint(alice);
        lsk.mint(bob);
    }

    function testMintFail() public {
        lsk.mint(alice);
        lsk.mint(bob);
        assertEq(alice, bob);
    }
}
```


To run the tests, execute the following command:

```bash
forge test -vv
``` 

The output should look like this:

```text
[⠢] Compiling...
No files changed, compilation skipped

Ran 2 tests for test/NFT.t.sol:NFTTest
[FAIL. Reason: assertion failed] testMintFail() (gas: 147160)
Logs:
// highlight-start
  Error: a == b not satisfied [address]
        Left: 0x328809Bc894f92807417D2dAD6b7C998c1aFdac6
       Right: 0x1D96F2f6BeF1202E4Ce1Ff6Dad0c2CB002861d3e
// highlight-end

[PASS] testMintPass() (gas: 132327)
Test result: FAILED. 1 passed; 1 failed; 0 skipped; finished in 1.13ms

Ran 1 test suite in 1.13ms: 1 tests passed, 1 failed, 0 skipped (2 total tests)

Failing tests:
Encountered 1 failing test in test/NFT.t.sol:NFTTest
[FAIL. Reason: assertion failed] testMintFail() (gas: 147160)

Encountered a total of 1 failing tests, 1 tests succeeded
```




## Interacting with the Smart Contract

If you verified on Blocksout, you can use the `Read Contract` and `Write Contract` sections under the `Contract` tab to interact with the deployed contract. To use `Write Contract`, you'll need to connect your wallet first, by clicking the `Connect to Web3` button (sometimes this can be a little finicky, and you'll need to click `Connect` twice before it shows your wallet is successfully connected).

To practice using the `cast` command-line tool which Foundry provides, we'll perform a call without publishing a transaction (a read), then sign and publish a transaction (a write).

### Performing a call

A key component of the Foundry toolkit, `cast` enables us to interact with contracts, send transactions, and get onchain data using Ethereum RPC calls. First we will perform a call from your account, without publishing a transaction.

From the command-line, run:

```bash
cast call <DEPLOYED_CONTRACT_ADDRESS> --rpc-url https://rpc.sepolia-api.lisk.com "balanceOf(address)" <YOUR_ACCOUNT_ADDRESS_HERE>
```

You should receive `0x0000000000000000000000000000000000000000000000000000000000000000` in response, which equals `0` in hexadecimal. And that makes sense — while you've deployed the NFT contract, no NFTs have been minted yet and therefore your account's balance is zero.

### Signing and publishing a transaction

Now let's sign and publish a transaction, calling the `mint(address)` function on the NFT contract we just deployed.

Run the following command:

```bash
cast send <DEPLOYED_CONTRACT_ADDRESS> --rpc-url https://rpc.sepolia-api.lisk.com "mint(address)" <RECIPIENT_ADDRESS_HERE> --private-key <SENDER_PRIVATE_KEY>
```



https://sepolia-blockscout.lisk.com/token/0xcCaA1C3eb8FEb5b09a5Eac1359BC4c70E18e29d9
:::info

Note that in this `cast send` command, we had to include our private key, but this is not required for `cast call`, because that's for calling view-only contract functions and therefore we don't need to sign anything.

:::

If successful, Foundry will respond with information about the transaction, including the `blockNumber`, `gasUsed`, and `transactionHash` and much more.

```text
blockHash               0xfa9d32794b0fc9c1a10d39c5289613dfe80b55f8ead06475ca877a389e088e67
// highlight-next-line
blockNumber             2165375
contractAddress         
cumulativeGasUsed       137472
effectiveGasPrice       3000000253
from                    0x5e1A92F84cA1CE280B3Cb29d79C3368f45b41EBB
// highlight-next-line
gasUsed                 93597
logs                    [{"address":"0x108872f713a27bc22ca1db8ceefcac8cbeddf9e5","topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x0000000000000000000000000000000000000000000000000000000000000000","0x000000000000000000000000488ba3c013020bd1712ed6a1997c4212d9711954","0x0000000000000000000000000000000000000000000000000000000000000001"],"data":"0x","blockHash":"0xfa9d32794b0fc9c1a10d39c5289613dfe80b55f8ead06475ca877a389e088e67","blockNumber":"0x210a7f","transactionHash":"0x76750ee1aaeed89c8f165d6f547002eb3bb833a142f73d63c1c3c9980fce8796","transactionIndex":"0x1","logIndex":"0x0","removed":false}]
logsBloom               0x00000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000000000200000000008000000000000000000040000000000000000000000000000020000000000000000080800000000000000000000000010000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000001000000000000400000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000000
root                    
status                  1
// highlight-next-line
transactionHash         0x76750ee1aaeed89c8f165d6f547002eb3bb833a142f73d63c1c3c9980fce8796
transactionIndex        1
type                    2
to                      0x1088…f9e5
l1Fee             "0x30fb62bfb0c"
l1GasPrice             "0x6d49929"
l1GasUsed             "0x8a4"
```

Finally, let's confirm that we did indeed mint ourselves one NFT. If we run the first `cast call` command again, we should see that our balance increased from 0 to 1:

```bash
cast call <DEPLOYED_CONTRACT_ADDRESS> --rpc-url https://rpc.sepolia-api.lisk.com "balanceOf(address)" <YOUR_ACCOUNT_ADDRESS_HERE>
```

And the response: `0x0000000000000000000000000000000000000000000000000000000000000001` (`1` in hex) — congratulations, you deployed a contract and minted an NFT with Foundry!

## Conclusion

Phew, that was a lot! We learned how to setup a project, deploy to Lisk, and interact with our smart contract using Foundry. The process is the same for real networks, just more expensive — and of course, you'll want to invest time and effort testing your contracts, to reduce the likelihood of user-impacting bugs before deploying.

For all things Foundry, check out the [Foundry book](https://book.getfoundry.sh/), or head to the official Telegram [dev chat](https://t.me/foundry_rs) or [support chat](https://t.me/foundry_support).
