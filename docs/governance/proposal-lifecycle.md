---
title: Proposal Lifecycle
sidebar_position: 1
slug: /governance/proposal-lifecycle
description: Summarizes the lifecycle of a proposal for the Lisk DAO.
keywords:
  [
    Lisk governance,
    Lisk DAO,
    Delegation,
    Voting,
    Proposals,
    Draft proposals,
    Proposal creation,
    Proposal lifecycle,
    Lisk Delegates,
    Delegates,
    Voting Power
  ]
---

# Lifecycle of a proposal

## 1. Discussion & draft proposals
Ideas for proposals can be discussed on Discord or on a new discussion thread on the [Governance Forum](https://forum.lisk.com).
Once an idea results in a concrete proposal, open a **draft proposal** thread on the forum:

- For funding proposals under the [Proposals|Funding](https://forum.lisk.com/c/proposals/funding) category 
- For general proposals under the [Proposals|General](https://forum.lisk.com/c/proposals/general) category 

Please fill out the provided template when you open a new thread in above categories.
You can add additional fields if required.

The discussion should be kept open for at least 2 weeks before moving to a proposal on Tally.
When the author wants to incorporate feedback from the discussion, the original draft proposal (typically the first message of the discussion thread) should be modified, instead of adding an updated proposal in a new message. The updated proposal should contain a “change log” or “updates” section at the top where the updates are documented.

## 2. Proposal creation

### Requirements

The following requirements need to be met to create a new proposal:

- **Account on Tally**: You need to be a registered delegate on the Lisk DAO Tally instance
- **Proposal threshold**: 300,000vpLSK are required to create new proposals. 
- **Discussion time**: Minimum 2 weeks of discussion in the governance forum

### Creating the proposal
If all requirements are met, anyone who considers the proposal mature enough, can create a proposal on Tally:

1. Include the full proposal text in the description. 
2. At the bottom, add the following line to the proposal:
`#proposer=0x???` where `???` is proposer address to prevent frontrunning[^1].

Example:
```
My proposal text
#proposer=0x???
```

If a corresponding draft proposal exists in the forum, post the link to the proposal on Tally in the respective thread.

## 3. Voting
Once a new proposal is created, the community has exactly **1 week** time to vote on the proposal on Tally.
Delegates should use the time to read and consider the proposal carefully, and place their vote according to their conclusion.

## 4. Results & Implementation
- If the proposal on Tally was successful, the foundation will act on the proposal if it is in accordance with the scope of Lisk governance as defined in <TBD>. See the implementation section for more details.


[^1]: This is used for frontrunning protection. By adding this pattern at the end of their proposal, one can ensure that no other address can submit the same proposal. An attacker would have to either remove or change that part, which would result in a different proposal id.
