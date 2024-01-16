---
title: Fees
sidebar_position: 3
slug: /fees
description: Documentation about network fees on Lisk. This page covers details of the two-component cost system involving L2 execution fees and L1 security fees, and offers insights on fee variations and cost-saving strategies.
keywords:
  [
    Lisk fees,
    transaction fees,
    network fees,
    Lisk network fees,
    L2 execution fee,
    L1 security fee,
    transaction costs,
    gas fees,
    fee calculation,
    cost-saving,
    transaction timing,
    fee variations,
    Lisk platform,
  ]
---

# Fees

Fees on Lisk Mainnet are, for the most part, significantly lower than on the L1 Ethereum network.
The low transaction fees can be provided, because Lisk is a [Layer 2 optimistic rollup](https://ethereum.org/en/developers/docs/scaling/optimistic-rollups) network.

## How are fees on Lisk calculated?

Every Lisk Mainnet transaction has two costs: An **L2 execution fee** and an **L1 security fee**.
At a high level, the L2 fee is the cost to execute your transaction in L2 and the L1 fee is the estimated cost to publish your transaction on L1 (in a rollup batch).

- **L1 security fee**: pays for the cost of publishing the transaction on L1 (the cost of Ethereum equivalent security).
It is deducted automatically from the user's ETH balance on Lisk Mainnet.
It is based on three factors that are multiplied together:
  - The gas price for L1 transactions (when the transaction was processed).

  - The gas used on L1 to publish the transaction. This is based on the transaction length, as well as the byte value (whether it is zero or a different value) for each byte.
<!-- TODO: Add link to GasPriceOracle contract -->
  - The L1 fee scalar, which is at writing 1.
  You can see the current value in the `GasPriceOracle` contract.
  Take the value provided by the contract and divide by a million.
- **L2 execution fee**: is charged as `transaction_gas_price * gas_used`.
The `transaction_gas_price` is composed of two components: a `base fee` and a `priority fee`, because Lisk is [EIP 1559](https://eips.ethereum.org/EIPS/eip-1559) compliant (although with [different parameter values](https://docs.optimism.io/chain/differences#eip-1559-parameters)).
Similarly to the L1 gas price, the L2 gas price can increase and decrease depending on how many transactions are being submitted to the L2.

  :::tip

  For more information about transaction fees, please check the [Optimism Developer Docs > Transaction Fees](https://docs.optimism.io/stack/transactions/fees)

  :::

## How do spikes in the Ethereum(L1) gas price affect transaction costs on Lisk(L2)?

The L1 fee will vary depending on the amount of transactions on the L1.
If the timing of your transaction is flexible, you can save costs by submitting transactions during periods of lower gas on the L1 (for example, over the weekend).

Changes after the transaction is processed on the sequencer do not affect the cost the user pays.

For an L2 transaction, the normal process is:

1. The wallet figures the cost of the transaction
2. The user submits the transaction
3. The sequencer processes the transaction
  - Process the transaction
  - Deduct the gas cost, based on the L1 and L2 gas prices at that time
4. The transaction is written to L1

After step 3 the transaction is Lisks's responsibility.
If the L1 gas price spikes, Lisk pays the new cost.
Also, which the cost of L1 gas could increase between steps 1 and 3, it is only updated every five minutes and it does not change by more than 25%.
So at most the user will pay 25% more than expected.
