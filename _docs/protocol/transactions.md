---
layout: page-fio
title: Transactions Protocol   
description: Transactions Protocol 
---

# Transactions Protocol
## 1. Overview
Actions define atomic behaviors within a smart contract. At a higher level, transactions define groups of actions that execute atomically within a decentralized application. Analogously to a database transaction, the group of actions that form a blockchain transaction must all succeed, one by one, in a predefined order, or else the transaction will fail. To maintain transaction atomicity and integrity in case of a failed transaction, the blockchain state is restored to a state consistent with the state prior to processing the transaction. This guarantees that no side effects arise from any actions executed prior to the point of failure.

### 1.1. Actions
An action can be authorized by one or more actors previously created on the blockchain. Actions can be created explicitly within a smart contract, or generated implicitly by application code. For any given actor:action pair there is at most one explicit associated minimum permission. If there are no explicit minimum permissions set, the implicit default is actor@active. Each actor can independently set their personal minimum permission for a given action. Also, a complex but flexible authorization structure is in place within the EOSIO software to allow actors to push actions on behalf of other accounts. Thus, further checks are enforced to authorize an actor to send an action (see 3.4.2. Permission Check).

There are two types of actions involved in a transaction. They mainly differ in the way they are executed by the EOSIO software:

1. Explicit actions, which are present in a signed transaction (see 2. Transaction Instance).
2. Implicit (inline) actions, which are created as a side effect of processing a transaction.

Implicit (inline) actions are also defined in smart contract code, just like explicit actions. The key difference is that inline actions are not included in the actual transactions propagated through the network and eventually included in a block; they are implicit.

#### 1.1.1. Explicit Actions
Regular or explicit actions, as their name implies, are included in the actual list of actions that form a transaction. Explicit actions are encoded as action instances (see 3.4.3. Action Instance) before being pushed into the transaction. Explicit actions also contain the actual payload data, if any, associated with the action to be executed as part of the transaction.

#### 1.1.2. Implicit Actions
An implicit (inline) action is generated as a result of an explicit caller action within a transaction (or another inline action, if nested) that requires that implicit action to perform an operation for the caller action to continue. As such, inline actions work within the same scope and permissions of the caller action. Therefore, inline actions are guaranteed to execute within the same transaction.

### 1.2. Smart Contracts
In EOSIO, smart contracts consist of a set of actions, usually grouped by functionality, and a set of type definitions which those actions depend on. Therefore, actions specify and define the actual behaviors of the contract. Several actions are implemented in the standard EOSIO contracts for account creation, producer voting, token operations, etc. Application developers can extend, replace, or disable this functionality altogether by creating custom actions within their own smart contracts and applications. Transactions, on the other hand, are typically created at the application level. Smart contracts are agnostic to them.

#### 1.2.1. Implementation
An EOSIO smart contract is implemented as a C++ class that derives from eosio::contract. Actions are implemented as C++ methods within the derived class. Transactions, on the other hand, are generated dynamically (as transaction instances) within an EOSIO application. The EOSIO software processes each transaction instance and keeps track of its state as it evolves from creation, signing, validation, and execution.

## 2. Transaction Instance
A transaction instance consists of a transaction header and the list of action instances and transaction extensions that make the actual transaction. The transaction header includes information necessary to assess the inclusion of the transaction in a block based on its expiration time, which is computed when the transaction is pushed for execution. Other fields include the block number that includes the transaction, a block ID prefix used to prevent "cross chain" or "cross fork" attacks, upper limits for CPU and network usage, and the number of seconds to delay the transaction, if applicable. The diagram below depicts a transaction instance.


