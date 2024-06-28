---
title: Fees
sidebar_position: 1
slug: /fees
description: Documentation about network fees on Lisk. This page covers details of the two-component cost system involving L2 execution fees and L1 data fees, and offers insights on fee variations and cost-saving strategies.
keywords:
  [
    Lisk fees,
    transaction fees,
    network fees,
    Lisk network fees,
    L2 execution fee,
    L1 security fee,
    L1 data fee,
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
The low transaction fees can be provided because Lisk is a [Layer 2 optimistic rollup](https://ethereum.org/en/developers/docs/scaling/optimistic-rollups) network.

## Gas tracker

To track the current and past gas fees on Lisk, check the gas tracker for the respective network on Blockscout:

- Lisk Mainnet: https://blockscout.lisk.com/gas-tracker
- Lisk Sepolia Testnet: https://sepolia-blockscout.lisk.com/gas-tracker 


## How are fees on Lisk calculated?

Every Lisk Mainnet transaction has two costs: An **L2 execution fee** and an **L1 data fee**.
At a high level, the L2 fee is the cost to execute your transaction on L2 and the L1 fee is the estimated cost to publish your transaction on L1 (in a rollup batch).

```text
transaction_fee = l2_execution_fee + l1_data_fee
```

### L2 Execution Fee 
The [L2 Execution Fee](https://docs.optimism.io/stack/transactions/fees#execution-gas-fee) is equal to the amount of gas used by the transaction multiplied by the gas price attached to the transaction.

```
l2_execution_fee = transaction_gas_price * l2_gas_used
```

Because Lisk Mainnet is EVM equivalent, the **gas used** by a transaction on Lisk Mainnet is **exactly the same** as the gas used by the same transaction on Ethereum.
If a transaction costs 100,000 gas units on Ethereum, it will cost 100,000 gas units on Lisk Mainnet.
**The only difference is that the gas price on Lisk Mainnet is much lower** than the gas price on Ethereum so you'll end up paying much less in ETH.
This also means that the total cost of the L2 Execution Fee of a transaction can be estimated using the same tools you would use to estimate the cost of a transaction on Ethereum.


#### L2 Execution Fee calculation
The transaction gas price is the sum of the [Base Fee](https://ethereum.org/en/developers/docs/gas/#base-fee) and the optional additional [Priority Fee](https://ethereum.org/en/developers/docs/gas/#priority-fee).

```
transaction_gas_price = l2_base_fee + l2_priority_fee
```

Like Ethereum, Lisk Mainnet uses the [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) mechanism to set the Base Fee for transactions (although with [different parameter values](#eip-1559-parameters) compared to Ethereum).

You can read more about how Ethereum's gas fees work over on [Ethereum.org](https://ethereum.org/en/developers/docs/gas/).

### L1 Data Fee
The [L1 Data Fee](https://docs.optimism.io/stack/transactions/fees#l1-data-fee) is the only part of the Lisk Mainnet transaction fee that differs from the Ethereum transaction fee.
This fee arises from the fact that the transaction data for all Lisk Mainnet transactions is published to Ethereum.
This guarantees that the transaction data is available for nodes to download and execute.

The L1 Data Fee is automatically charged for any transaction that is included in a Lisk Mainnet block.
It is deducted directly from the address that sent the transaction.

The L1 Data Fee is most heavily influenced by the Ethereum base fee that is continuously and trustlessly relayed from Ethereum to Lisk Mainnet.

The actual amount of this fee depends on the following input values:

1. The **signed transaction**, serialized according to the standard Ethereum transaction RLP encoding.
2. The **current Ethereum base fee** and/or blob base fee (trustlessly relayed from Ethereum).
3. Two **scalar parameters** that independently scale the base fee and blob base fee.

#### L1 Data Fee calculation
The L1 data fee is calculated according to the following formula:

```
l1_data_fee = tx_compressed_size * weighted_gas_price
```

Where the `tx_compressed_size` is calculated like this:

```
tx_compressed_size = [(count_zero_bytes(tx_data)*4 + count_non_zero_bytes(tx_data)*16)] / 16
```

:::note
`tx_compressed_size` is an estimation of the size that a transaction will occupy in blobs.
The divisor of 16 represents the storage savings of using blobs vs calldata.

The "L1 Gas used by txn" field of transaction details in [Blockscout](https://blockscout.lisk.com/) contains the `tx_compressed_size` multiplied by 16 (i.e., the `calldata` size).
:::

Next, the two scalars are applied to the base fee and blob base fee parameters to compute a weighted gas price multiplier.

```
weighted_gas_price = 16*base_fee_scalar*base_fee + blob_base_fee_scalar*blob_base_fee
```

The default values for the scalars are:

  - `base_fee_scalar` = 0.786381
  - `blob_base_fee_scalar` = 0.01734

They can be adjusted depending on network conditions, to mitigate spikes in the transaction fees. 

:::note

It is currently **not** possible to limit the maximum L1 Data Fee that a transaction is willing to pay.

For further information about transaction fees, please check the [Optimism Developer Docs > Transaction Fees](https://docs.optimism.io/stack/transactions/fees)

:::

## EIP-1559 Parameters

The [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) parameters used by the Lisk Mainnet differ from those used by Ethereum as follows:

| Parameter                             | Lisk Mainnet value | Ethereum value (for reference) |
| ------------------------------------- | ---------------: | -----------------------------: |
| Block gas limit                       |   30,000,000 gas |                 30,000,000 gas |
| Block gas target                      |    1,500,000 gas |                 15,000,000 gas |
| EIP-1559 elasticity multiplier        |               20 |                              2 |
| EIP-1559 denominator                  |            1,000 |                              8 |
| Maximum base fee increase (per block) |             1.9% |                          12.5% |
| Maximum base fee decrease (per block) |             0.1% |                          12.5% |
| Block time in seconds                 |                2 |                             12 |


## How do fluctuations in gas price on Ethereum (L1) affect transaction costs on Lisk (L2)?

While the L1 Data Fee will be always cheaper compared to posting the transaction directly to the Ethereum mainnet (due to the efficient encoding in batching transactions), its value will vary depending on the amount of transactions on the L1.
If the timing of your transaction is flexible, you can save cost by submitting transactions during periods when gas prices on L1 are lower than usual for example, over the weekend.

Changes after the transaction is processed on the sequencer do not affect the cost the user pays.

For an L2 transaction, the normal process is:

1. The wallet estimates the cost of the transaction and shows it to the user.
2. The user then submits the transaction.
3. The sequencer processes the transaction in two phases.
    - First, it processes the transaction.
    - Then, it deducts the gas cost, based on the L1 and L2 gas prices at that time.
4. After that, the transaction is written to L1.

In principle, between steps 1 and 3 the gas price might change.
However, it can not increase by more than 12.5%, therefore the difference between the price shown to the user in step 1 and the actual one is bounded by 12.5%. 
After step 3, the finality of the transaction is Lisk's responsibility.
If the L1 gas price spikes, Lisk pays the new cost.

In conclusion, the user will pay at most 12.5% more than expected.
See the [Optimism Docs > Transaction Fees](https://docs.optimism.io/stack/transactions/fees#mechanism) for more information about transaction fees.
