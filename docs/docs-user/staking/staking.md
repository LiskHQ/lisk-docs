---
title: Overview
sidebar_position: 1
slug: /user/staking/overview
description: 'How to stake LSK tokens to receive staking rewards.'
keywords:
  [
    'Lisk',
    'Lisk staking',
    'staking LSK',
    'staking rewards',
    'Lisk rewards',
    'earn LSK',
    'earn Lisk',
  ]
---

# Staking LSK tokens

LSK staking is required for participating in the [Lisk DAO](https://www.tally.xyz/gov/lisk) and having therefore an active involvement in the project's decision making. Our staking system rewards LSK stakers for their participation with [staking rewards](#staking-rewards) based on their commitment duration . 

## Staking Guides

- [How to stake, claim and un-stake](stake-unstake.mdx)
- [How to pause a locking position](pause-position.mdx)
- [How to increase the stake](../staking/increase-stake.mdx)

## Locking positions

Every time you [stake](stake-unstake.mdx#how-to-stake-your-lsk-tokens) a certain amount of LSK for a specific locking duration, this will create a new **locking position**.

:::tip
The **minimum locking duration** for staking is **two weeks**.

The **maximum locking duration** for staking is **two years**.
:::

Locking positions are represented as **NFTs** using the ERC-721 standard, similar to Uniswap v3 liquidity positions.
This enhances composability into DeFi and potential future uses.

## Staking rewards

Staking rewards incentivize users to participate in governance, making the decision making more decentralized and community-driven.  
In short, users get [voting power](docs-user/governance/overview.mdx#voting-power) and rewards for staking tokens for a specific time period.

Lisk applies a **time-weight boosting** on rewards:
The further the end of the locking duration is in the future, the more rewards you get.
This also implies that the rewards decrease every day.
This way, we reward token holders for committing long-term to the Lisk project so we attract them as long-term advocates for Lisk while reducing short-term speculation and volatility. 

- Users can [claim](stake-unstake.mdx#how-to-claim-staking-rewards) their rewards at any time.   
- Users can modify their locking positions (increase amount, extend locking duration) at any time they want.
- Users have the option to **pause** their locking period countdown.
That means, the remaining locking duration remains fixed until the user decides to resume it.
Note that this results in **higher staking rewards**, since the weight remains fixed, as opposed to a weight daily decreasing when the countdown is active. 

### Staking rewards distribution
A total of 24 million LSK tokens will be used over the course of 3 years for the LSK staking rewards program (8 million LSK per year).
This amount is provided to the [Rewards contract](https://blockscout.lisk.com/address/0xD35ca9577a9DADa7624a35EC10C2F55031f0Ab1f).

**Daily Reward Calculation:** Rewards are taken from the balance of the Rewards contract and calculated daily, based on the amount locked and the remaining locking duration.
Concretely, the weight for a locked amount is given by:

```
weight = lockedAmount * (remainingLockingDurationInDays + 150)
```

The total daily amount of staking rewards, 8,000,000 / 365 LSK, is then shared by all users proportional to their weight.

That means, the daily rewards for a locking position are calculated as: 

```
dailyRewards = weight/totalWeight * TotalDailyRewards
```

The current value of `totalWeight` can be checked in the [Rewards contract](https://blockscout.lisk.com/address/0xD35ca9577a9DADa7624a35EC10C2F55031f0Ab1f?tab=read_proxy).
`totalDailyRewards` can be calculated by taking the yearly available rewards and dividing it by 365:  `8,000,000 / 365 = 21917`

### Example: Reward calculation for 1 vs 2 years
For example, if someone stakes 100LSK for *1 year*, this would result in the following reward for that day, assuming `totalWeight` is `12462098705` for this example:

```
weight = 100 * (365 + 150) = 51500
```

```
dailyRewards = 51500 / 12462098705 * 21917 = 0.0905726657 LSK 
```

If the 100 staked LSK expire in *two years*, this would result in the following reward on that day:

```
weight  = 100 * (730 + 150) = 88000
```

```
dailyRewards = 88000 / 12462098705 * 21917 = 0.15476494334 LSK 
```

After the end of this 3-year span, we expect that developments in the Optimism Superchain Ecosystem (shared, decentralized sequencers) will lead us to a new staking mechanism.

## Unstaking

Once the locking period of a [locking position](#locking-positions) has expired, it is possible to unlock the staked tokens again, by [unstaking](stake-unstake.mdx#how-to-unstake-your-lsk-tokens) them.

:::tip
In case you need to unlock your tokens earlier that the defined locking period, it is possible to unstake your tokens before the locking period expired by using the [fast unlock](#fast-unlock) option.

Using fast unlock will involve a penalty to be paid.
:::

Once they are unstaked, the LSK tokens can be used as before for any other purpose.

### Fast Unlock
Fast unlock allows you to unstake your LSK tokens before their locking period has expired.
It involves paying a penalty and waiting for a 3-day emergency unlocking period.
The penalty is proportional to the remaining days in the staking period that will be skipped.

The penalty is calculated using the formula:

```
Penalty = 0.5 * Staked Amount * (Remaining Days / 730)
```

Please note that the maximum value for the remaining days is 730.

For example, if a user wants to fast unlock a position with 100 LSK and remaining locking duration of 150 days, then the penalty is calculated as follows:

```
Penalty = 0.5 x 100 x (147 / 730) = 10.068 LSK
```

Note that we multiply by 147 and not 150, since the user will still have to wait for 3 days, so the locking duration decreased by 147 overall. 

