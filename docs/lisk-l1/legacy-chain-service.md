---
title: Legacy Chain Service
slug: /lisk-l1/legacy-chain-service
description: How to access data from the Lisk L1 legacy chain.
keywords:
  [
    Lisk L1,
    Lisk legacy,
    Lisk legacy chain,
    legacy chain service,
    Lisk legacy account,
    chain history,
    account history
  ]
difficulty: beginner
---
:::warning
These docs are referring to the previous Lisk chain on L1, which stopped when Lisk migrated to L2 on May 2024. 
If you wish to develop on the current Lisk L2 chain, please refer to the developer documentation under the [Building on Lisk](../category/building-on-lisk) category
:::

# Legacy Chain Service

To access data from the Legacy Lisk L1 chain, please use the legacy chain service available under https://legacy.lisk.com.


## Usage 
How to use the legacy chain service:

- Get a **block by height** `https://legacy.lisk.com/blocks/<BLOCK_HEIGHT>.json`
- Get a **transaction by id** `https://legacy.lisk.com/transactions/<TRANSACTION_ID>.json`
- Get an **account by address** `https://legacy.lisk.com/accounts/<LEGACY_ACCOUNT_ADDRESS>.json`
- Get **histories by address** `https://legacy.lisk.com/histories/<LEGACY_ACCOUNT_ADDRESS>.csv`

  where `<LEGACY_ACCOUNT_ADDRESS>` is the Lisk L1 address of the format:`lsk**************************************` or `*******************L` (for uninitialized accounts).
 
  If a Lisk L1 legacy account (`*******************L` address) was initialized, the entire history including that of the `*******************L` legacy address will be consolidated under the corresponding `lsk` address. The `*******************L` address's history won't be available separately.


:::info[INFO: When is a Lisk L1 account initialized?]
A Lisk L1 legacy account is considered initialized, if it either has an outgoing transaction on Lisk Core v2, or had performed a [legacy reclaim transaction](https://github.com/LiskArchive/lisk-core/blob/development/src/application/modules/legacy/commands/reclaim.ts) on Lisk Core v3/v4, prior to the Lisk L2 migration, which happened end of May 2024, at block height 24,823,618.
:::