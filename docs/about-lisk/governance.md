---
title: Governance
sidebar_position: 1
slug: /governance
description: Documentation about the governance of the Lisk project.
keywords:
  [
    Lisk governance,
    Lisk DAO,
    Lisk Grants,
    Funding,
    Delegation,
    Voting,
    Proposals,
  ]
---

# Governance

At the moment, the security of the Lisk Mainnet is dependent on a [multisig wallet](https://www.coindesk.com/tech/2020/11/10/multisignature-wallets-can-keep-your-coins-safer-if-you-use-them-right/) managed by several individuals of the Onchain Foundation.
This multisig wallet can be used to upgrade core Lisk Mainnet smart contracts without upgrade delays.

To decentralize the governance of the Lisk project further, Lisk introduces a decentralized autonomous organization, the Lisk DAO, which allows Lisk token holders to participate together in the governance of the Lisk project.

## Lisk DAO
The Lisk DAO provides the opportunity for LSK token holders to participate in the overall governance of the Lisk project, including allocation of funds, protocol updates, or strategic directions. Decisions are made via [proposals](#proposals).

### Tools
#### Discord
The `#lisk-dao` channel in the [Lisk Chat](https://lisk.chat) Discord server is a comunity chat dedicated to discuss topics all around the Lisk DAO, share news and updates, or share ideas for new proposals.
#### Lisk Governance Forum
The [Lisk Governance Forum](https://forum.lisk.com/) is the place for the community to discuss the Lisk gonvernance and draft proposals, before they are submitted on Tally.
#### Tally
Tally is the platform used to create and vote for proposals of the Lisk DAO.

<!-- TODO: Update link to tally instance -->
The [Lisk DAO Tally instance](https://www.tally.xyz/gov/3rd-testing) is the place where users can vote on proposals or delegate their voting power.

### Treasury
<!-- TODO: Answer questions:
Where do the funds come from?
How are new funds added to the treasury?
 -->
The Lisk DAO has an associated treasury (the balance of the Governor contract). The treasury is NOT managed by the Onchain Foundation. Instead, the funds from the treasury can only be transferred via successful proposals. This means, the proposal must specify the transfer transaction including the amount in their setup, and if the proposal was successful, the transaction can be send. 

### Administrative role of the Onchain Foundation
The foundation will have an administrative role and will take care of the following

1. Removal of draft proposals that reasonably appear to be fraudulent, spam-oriented, defamatory, hateful, or otherwise inappropriate.
2. Management of mutually contradictory proposals that are submitted simultaneously or in close proximity to one another.
3. Administration of network maintenance, such as emergency bug fixes or release rollbacks (with or without a governance vote).

### Proposals
Proposal are created on [Tally](#tally). For spam protection, the following requirement must be fulfilled in order to create a proposal:

- **Proposal threshold**: For creating a proposal, the voting power of the proposer must be at least 300,000 vpLSK, i.e., the value corresponding to 100,000 LSK locked for 2 years where the countdown is paused.

#### Proposal types

| Type   | Funding          | General          |
| :----------|:------------- |:------------- |
| **Description** | A proposal for receiving a certain amount of funds to an address. If approved, the recipient receives the amount given in the proposal. | General proposals about protocol parameters or the project direction in general that may be followed by the Lisk Foundation or not, depending also on feasibility and cost.  |
| **Binding?**  | Yes  | No  |

#### Proposal Evaluation
The following requirements must be fulfilled for a proposal to pass:

- **Quorum**: For a proposal to pass, the “yes” and “abstain” votes must sum up at least to 24,000,000 vpLSK, i.e., the value that corresponds to 8,000,000 LSK locked for 2 years where the countdown is paused.
- There must be strictly more “yes” than “no” votes.

#### Implementation of funding proposals
The transfer from the [Lisk DAO treasury](#treasury) can be executed by anyone, once a funding proposal is approved. Funding proposals are **binding**, which means that no-one, not even the Onchain Foundation, can prevent the transfer, if the proposal passed.
#### Implementation of general proposals
For approved general proposals, the Onchain Foundation will determine whether the proposal is safe, secure, consistent with the scope of Lisk governance, and capable of being implemented in a legally compliant manner. If it is, the Foundation will act diligently and in a commercially reasonable manner to cause the proposal to be implemented.

### Voting Power
To get some voting power, users must **lock/stake** some LSK tokens. This works as follows:

Users can lock tokens for a specific locking duration (between 2 weeks and 2 years). After the locking duration ends, the users can redeem their tokens. Locking happens on our portal.

Initially, the voting power of a locked token will be constant during its locking duration. But it is possible to [boost the voting power](#boosting-the-voting-power) by up to 200% where the boost is proportional to remaining locking duration.

We consider to transition to a voting-escrow-Token model at some point. In this model the voting power decreases linearly when getting closer to end of the locking duration. But this requires custom integration from Tally.

#### Voting power calculation:
Locked tokens provide a voting power proportional to the amount of locked tokens. Concretely, 1 locked LSK provides one unit of voting power.

#### Boosting the voting power
To enable voting power proportional to the promised locking duration, users have the option to pause the countdown of the locking period. That means, the counting towards the end of the locking period is paused until the user decides to resume it. In the case of pausing, the user receives a boost of the voting power. It is set to `lockedAmount * (1 + remainingLockingDurationInDays/365)`. Hence, the voting power can be increased by up to 200%.

### Delegation
The Governor framework also requires to delegate the voting power in order to use it. The voting power can be delegated to other users or to themselves. But self-delegation is a requirement if users want to vote themselves. Delegation happens on [Tally](#tally).

## Governance Goals
There are two primary goals of Lisks governance system:

### Capture resistance
Governance plays a key role in securing the anti-capture and censorship resistance of the Lisk protocol. Governance should:

1. make it possible for the chain or network operations to continue without reliance on any individual entity, and 
2. prevent any one entity or small group of entities from being able to control or censor the protocol or its functions.

### Resource allocation
Governance’s second primary responsibility is to allocate resources effectively to support the Lisks vision and accrue sustainable value to the Lisk DAO. Vision & value may often be in conflict, and allocating resources effectively involves a blend of short- and long-term thinking. This includes allocation of both the token treasury and protocol revenue.

## Design Principles
Design decisions for Lisks governance system should be made in line with three key principles:

### Governance minimization
The set of governance responsibilities that are encoded onchain or formalized in voting processes should remain as minimal as possible. The Lisk DAO aims to reduce governance to its essence and to avoid introducing regulation where freedom can achieve the same result. This principle is key to encouraging permissionless innovation. In practice, this looks like a minimal set of:
1. onchain governance processes to upgrade Lisk contracts and tune the economic parameters of the system, and
2. offchain social processes to maintain a healthy community.

### Iteration
Lisk is decentralizing iteratively to increase the chances of building a healthy system that lasts for the long-term. This means the Foundation will play a role in establishing processes, help the DAO through its first few rapid feedback loops in improving those processes, then reduce its role over time. (This also means the design principles and goals outlined in this document may be invalidated or updated along the way.) This iteration gives the DAO a chance to learn how to make thoughtful decisions using an un-intuitive but essential loop: introduce a governance process that involves active participation, then gradually work to automate or minimize it over time. Governance’s responsibility then becomes to adjust the autopilot when necessary, not to keep two hands on the wheel.

### Forking 
The ability to fork and the ability to exit are critical to protect individual freedoms.  All of the core software and tooling required to run the Lisk network should be made open source, freely available, and easy to use such that a fork is always a viable alternative. This isn’t just about vibes: in crypto, where credible commitments not to extract are what makes decentralized platforms valuable, this is a competitive advantage. Participants will be more likely to join Lisk if they have the ability to make an alternative.
