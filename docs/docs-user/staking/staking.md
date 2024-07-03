---
title: LSK Staking
sidebar_position: 1
slug: /user/staking
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

Lisk staking is a system designed to encourage token holders to lock their LSK tokens for participating in on-chain governance, rewarding them based on their commitment duration.

## Staking rewards

Staking rewards incentivize users to participate in governance, making the decision making more decentralized and community-driven.  
In short, users get [voting power](docs-user/governance/overview.mdx#voting-power) and rewards for staking tokens for a specific time period.

Lisk applies a **time-weight boosting** on rewards:
The further the end of the locking duration is in the future, the more rewards you get.
This also implies that the rewards decrease every day.
This way, we reward token holders for committing long-term to the Lisk project so we attract them as long-term advocates for Lisk while reducing short-term speculation and volatility. 

<!-- {/* TODO: Remove "coming soon" once features are implemented on Lisk Mainnet */} -->
- Users can claim their rewards at any time.   
- **[Coming soon]** Users can modify their locking positions (increase amount, extend/pause locking duration) at any time they want.
- **[Coming soon]** Users have the option to **pause** their locking period countdown.
That means, the remaining locking duration remains fixed until the user decides to resume it.
Note that this results in **higher staking rewards**, since the weight remains fixed, as opposed to a weight daily decreasing when the countdown is active. 

### Staking rewards distribution
A total of 24 million LSK tokens will be used over the course of 3 years for the LSK staking rewards program (8 million LSK per year).
This amount is provided to the [Rewards contract](https://blockscout.lisk.com/address/0xD35ca9577a9DADa7624a35EC10C2F55031f0Ab1f).

Rewards are taken from the balance of the Rewards contract and calculated daily, based on the amount locked and the remaining locking duration.
Concretely, the weight for a locked amount is given by `lockedAmount * (remainingLockingDurationInDays + 150)`.
The total daily amount of staking rewards, 8,000,000 / 365 LSK, is then shared by all users proportional to their weight.

After the end of this 3-year span, we expect that developments in the Optimism Superchain Ecosystem (shared, decentralized sequencers) will lead us to a new staking mechanism.

## Staking Guides

- [How to stake, claim and un-stake](stake-unstake.md)
- [How to increase the stake](increase-stake.md)
- [How to pause the locking period](pause-locking-period.md)
