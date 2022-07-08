/*
 * This is an example of an AssemblyScript smart contract with two simple,
 * symmetric functions:
 *
 * 1. setGreeting: accepts a greeting, such as "howdy", and records it for the
 *    user (account_id) who sent the request
 * 2. getGreeting: accepts an account_id and returns the greeting saved for it,
 *    defaulting to "Hello"
 *
 * Learn more about writing NEAR smart contracts with AssemblyScript:
 * https://docs.near.org/docs/develop/contracts/as/intro
 *
 */

import {
  context,
  logging,
  PersistentVector,
  storage,
  u128,
  PersistentMap,
  env,
} from "near-sdk-as";
import { Context, ContractPromise } from "near-sdk-core";
import { Proposal, proposals } from "./model";

const approves = new PersistentMap<string, u64>("a:");
const data_yes = new PersistentVector<PersistentMap<string, u64>>("c");
const data_no = new PersistentVector<PersistentMap<string, u64>>("d");
const history_yes = new PersistentVector<PersistentMap<u64, string>>("e");
const history_no = new PersistentVector<PersistentMap<u64, string>>("f");
const staking = new PersistentMap<string, u128>("g");
const balanceMap = new PersistentMap<string, u128>("h");
const stakers = new PersistentMap<string, string>("i");
const time = new PersistentMap<string, u64>("j");
const rewards = new PersistentMap<string, u128>("k");

export function get_num(): u64 {
  return storage.getPrimitive<u64>("counter", 0);
}

// Public method - Increment the counter
export function increment(): void {
  const new_value = get_num() + 1;
  storage.set<u64>("counter", new_value);
  logging.log("Increased number to " + new_value.toString());
}

export function get_num_yes(proposalID: i32): u64 {
  return storage.getPrimitive<u64>("counterYes" + proposalID.toString(), 0);
}

// Public method - Increment the counter
export function increment_yes(proposalID: i32): void {
  const new_value = get_num_yes(proposalID) + 1;
  storage.set<u64>("counterYes" + proposalID.toString(), new_value);
  logging.log("Increased number to " + new_value.toString());
}
export function get_num_no(proposalID: i32): u64 {
  return storage.getPrimitive<u64>("counterNo" + proposalID.toString(), 0);
}

// Public method - Increment the counter
export function increment_no(proposalID: i32): void {
  const new_value = get_num_no(proposalID) + 1;
  storage.set<u64>("counterNo" + proposalID.toString(), new_value);
  logging.log("Increased number to " + new_value.toString());
}

export function keyFrom(address: string, voting_count: u64): string {
  return address + ":" + voting_count.toString();
}

export function vote(proposalID: i32, voteType: u64): u64 {
  let num_votes: u64 = 1;
  if (voteType == 1) {
    if (!data_yes[proposalID].contains(context.sender)) {
      //assert((num_votes*num_votes) <= getBalance(context.sender), "not enough tokens to vote");
      data_yes[proposalID].set(context.sender, num_votes);
    } else {
      let num_votes = data_yes[proposalID].getSome(context.sender);
      num_votes++;
      //assert((num_votes*num_votes) <= getBalance(context.sender), "not enough tokens to vote");
      data_yes[proposalID].set(context.sender, num_votes);
    }
    increment_yes(proposalID);
    let vote_count = data_yes[proposalID].getSome(context.sender);
    //transfer("light.sputnikv2.testnet",vote_count*vote_count); //TODO : CHANGE THE ADDRESS TO RECIEVE THE COINS WHEN VOTING!!
    history_yes[proposalID].set(
      get_num_yes(proposalID),
      keyFrom(context.sender, vote_count)
    );
  } else {
    if (!data_no[proposalID].contains(context.sender)) {
      //assert((num_votes*num_votes) <= getBalance(context.sender), "not enough tokens to vote");
      data_no[proposalID].set(context.sender, num_votes);
    } else {
      let num_votes = data_no[proposalID].getSome(context.sender);
      num_votes++;
      //assert((num_votes*num_votes) <= getBalance(context.sender), "not enough tokens to vote");
      data_no[proposalID].set(context.sender, num_votes);
    }
    increment_no(proposalID);
    let vote_count = data_no[proposalID].getSome(context.sender);

    //transfer("light.sputnikv2.testnet",vote_count*vote_count); //TODO : CHANGE THE ADDRESS TO RECIEVE THE COINS WHEN VOTING!!
    history_no[proposalID].set(
      get_num_no(proposalID),
      keyFrom(context.sender, vote_count)
    );
  }
  const title = proposals[proposalID].title;
  const description = proposals[proposalID].description;
  const url = proposals[proposalID].url;
  const id = proposals[proposalID].id;
  const histYes = historyYes(id);
  const histNo = historyNo(id);
  proposals[proposalID] = new Proposal(
    title,
    description,
    url,
    id,
    <i32>get_num_yes(proposalID),
    <i32>get_num_no(proposalID),
    histYes,
    histNo
  );
  return num_votes;
}

const DEFAULT_MESSAGE = "Hello";

// Exported functions will be part of the public interface for your smart contract.
// Feel free to extract behavior to non-exported functions!
export function getGreeting(accountId: string): string | null {
  // This uses raw `storage.get`, a low-level way to interact with on-chain
  // storage for simple contracts.
  // If you have something more complex, check out persistent collections:
  // https://docs.near.org/docs/concepts/data-storage#assemblyscript-collection-types
  return storage.get<string>(accountId, DEFAULT_MESSAGE);
}

export function setGreeting(message: string): void {
  const accountId = context.sender;
  // Use logging.log to record logs permanently to the blockchain!
  logging.log(`Saving greeting "${message}" for account "${accountId}"`);
  storage.set(accountId, message);
}

export function addProposal(
  title: string,
  description: string,
  url: string
): void {
  // Creating a new entry and populating fields with our data
  const entry = new Proposal(
    title,
    description,
    url,
    proposals.length,
    0,
    0,
    "",
    ""
  );
  // Adding the entry to end of the the persistent collection
  proposals.push(entry);
  const dataMapYes = new PersistentMap<string, u64>(
    "datamapYes" + proposals.length.toString()
  );
  const dataMapNo = new PersistentMap<string, u64>(
    "datamapNo" + proposals.length.toString()
  );
  const dataHistoryYes = new PersistentMap<u64, string>(
    "dataHistoryYes" + proposals.length.toString()
  );
  const dataHistoryNo = new PersistentMap<u64, string>(
    "dataHistoryNo" + proposals.length.toString()
  );
  data_yes.push(dataMapYes);
  data_no.push(dataMapNo);
  history_yes.push(dataHistoryYes);
  history_no.push(dataHistoryNo);
}

export function getProposals(): Proposal[] {
  const result = new Array<Proposal>(proposals.length);
  for (let i = 0; i < proposals.length; i++) {
    result[i] = proposals[i];
  }
  return result;
}

export function historyYes(proposalID: i32): string {
  let ch = "";
  for (let i: u64 = 1; i <= get_num_yes(proposalID); i++) {
    ch = ch + history_yes[proposalID].getSome(i) + "\n";
  }
  return ch;
}

export function historyNo(proposalID: i32): string {
  let ch = "";
  for (let i: u64 = 1; i <= get_num_no(proposalID); i++) {
    ch = ch + history_no[proposalID].getSome(i) + "\n";
  }
  return ch;
}

// parameters taken by cross contract method
@nearBindgen
class FTBalanceOf {
  account_id: string;
}

@nearBindgen
class Nothing {}

export function balanceOf(accountId: string): void {
  // Invoke a method on another contract
  // This will send an ActionReceipt to the shard where the contract lives.
  ContractPromise.create<FTBalanceOf>(
    "lights.testnet", // contract account id
    "ft_balance_of", // // contract method name
    {
      account_id: accountId,
    },
    5_000_000_000_000, // gas to attach
    u128.Zero // yocto NEAR to attach
  )

    // After the smart contract method finishes a DataReceipt will be sent back
    // .then registers a method to handle that incoming DataReceipt
    .then<Nothing>(
      Context.contractName, // this contract's account id
      "myCallback", // the method to call after the previous cross contract call finishes
      {},
      5_000_000_000_000, // gas to attach to the callback
      u128.Zero // yocto NEAR to attach to the callback
    )

    .returnAsResult(); // return the result of myCallback
}

export function myCallback(): u128 {
  // an array of results from the previous cross contract calls
  // this array will have a length of 1, unless the previous
  // promises was created using ContractPromise.all
  const results = ContractPromise.getResults();
  assert(results.length == 1, "This is a callback method");

  // the result of the cross contract call
  const result = results[0];

  const balance = result.decode<u128>();
  balanceMap.set(context.sender, balance);

  return balance;
}

@nearBindgen
class FTtransfer {
  receiver_id: string;
  amount: string;
  memo: string;
}

export function transferCall(
  receiverId: string,
  Amount: string,
  Memo: string,
  attach: u128
): void {
  // Invoke a method on another contract
  // This will send an ActionReceipt to the shard where the contract lives.
  ContractPromise.create<FTtransfer>(
    "lights.testnet", // contract account id
    "ft_transfer", // // contract method name
    {
      receiver_id: receiverId,
      amount: Amount,
      memo: Memo,
    },
    150_000_000_000_000, // gas to attach
    attach // yocto NEAR to attach
  )
    // After the smart contract method finishes a DataReceipt will be sent back
    // .then registers a method to handle that incoming DataReceipt
    .then<Nothing>(
      context.contractName, // this contract's account id
      "transferCallback", // the method to call after the previous cross contract call finishes
      {},
      5_000_000_000_000, // gas to attach to the callback
      u128.Zero // yocto NEAR to attach to the callback
    )

    .returnAsResult(); // return the result of myCallback
}

export function transferCallback(): void {
  // an array of results from the previous cross contract calls
  // this array will have a length of 1, unless the previous
  // promises was created using ContractPromise.all
  logging.log("transfer done");
}

export function stake(amount: u128): void {
  let num = get_num();
  //assert(amount < balanceMap.getSome(context.sender));
  //transferCall("lightency_staking_pool.testnet",amount.toString(),"",u128.One);
  if (!staking.contains(context.sender)) {
    staking.set(context.sender, amount);
    increment();
    num = get_num();
    stakers.set(num.toString(), context.sender);
  } else {
    let stakeAmount = staking.getSome(context.sender);
    staking.set(context.sender, u128.add(amount, stakeAmount));
  }

  time.set(context.sender, env.block_timestamp());
  rewards.set(context.sender, u128.Zero);

  //balanceOf(context.sender);
}

export function getStake(accountId: string): u128 {
  return staking.getSome(accountId);
}

export function getBalance(accountId: string): u128 {
  return balanceMap.getSome(accountId);
}

export function getTime(accountId: string): u64 {
  logging.log(time.getSome(accountId).toString());
  return time.getSome(accountId);
}

export function getStakers(id: string): void {
  logging.log(get_num());
  logging.log(stakers.getSome(id));
}

export function getReward(accountId: string): u128 {
  return rewards.getSome(accountId);
}

@nearBindgen
class fraction {
  numerator: u128;
  denominator: u128;
}

export function rewardFeeCalculation(): void {
  const percentage: fraction = {
    numerator: u128.from<string>("30"),
    denominator: u128.from<string>("100"),
  };
  const accountId = context.sender;
  const now: u64 = env.block_timestamp();
  const last_update: u64 = time.getSome(accountId);

  const UPDATE_INTERVAL: u64 = 864000000000000  // 1 day
  //const UPDATE_INTERVAL: u64 = 120000000000;

  assert(now >= last_update + UPDATE_INTERVAL, "Not enough time has passed");

  if (now >= last_update + UPDATE_INTERVAL) {
    const days: u64 = (now - last_update) / UPDATE_INTERVAL;
    let initial = staking.getSome(accountId);
    let reward = u128.Zero;
    for (let i: u64 = 1; i <= days; ++i) {
      initial = u128.add(initial, reward);
      reward = u128.div(
        u128.mul(initial, percentage.numerator),
        percentage.denominator
      );
    }
    transferFromRewardPool(
      "lightency_staking_pool.testnet",
      reward.toString(),
      "",
      u128.One
    );
    staking.set(accountId, u128.add(staking.getSome(accountId), reward));
    time.set(accountId, env.block_timestamp());
    rewards.set(accountId, reward);

    //logging.log(reward.toString())
  }
}

export function unstake(amount: u128): void {
  assert(amount <= staking.getSome(context.sender),"Not enough staked tokens!!!");
  transferFromStakingPool(context.sender, amount.toString(), "", u128.One);
  staking.set(
    context.sender,
    u128.sub(staking.getSome(context.sender), amount)
  );
  time.set(context.sender, env.block_timestamp());
  rewards.set(context.sender, u128.Zero);
}

export function transferFromStakingPool(
  receiverId: string,
  Amount: string,
  Memo: string,
  attach: u128
): void {
  // Invoke a method on another contract
  // This will send an ActionReceipt to the shard where the contract lives.
  ContractPromise.create<FTtransfer>(
    "lightency_staking_pool.testnet", // contract account id
    "transfer_staking", // // contract method name
    {
      receiver_id: receiverId,
      amount: Amount,
      memo: Memo,
    },
    150_000_000_000_000, // gas to attach
    attach // yocto NEAR to attach
  )
    // After the smart contract method finishes a DataReceipt will be sent back
    // .then registers a method to handle that incoming DataReceipt
    .then<Nothing>(
      Context.contractName, // this contract's account id
      "transferFromStakingPoolCallback", // the method to call after the previous cross contract call finishes
      {},
      5_000_000_000_000, // gas to attach to the callback
      u128.Zero // yocto NEAR to attach to the callback
    )

    .returnAsResult(); // return the result of myCallback
}

export function transferFromStakingPoolCallback(): void {
  // an array of results from the previous cross contract calls
  // this array will have a length of 1, unless the previous
  // promises was created using ContractPromise.all
  logging.log("transfer done");
}

export function transferFromRewardPool(
  receiverId: string,
  Amount: string,
  Memo: string,
  attach: u128
): void {
  // Invoke a method on another contract
  // This will send an ActionReceipt to the shard where the contract lives.
  ContractPromise.create<FTtransfer>(
    "reward_pool.testnet", // contract account id
    "transfer_reward", // // contract method name
    {
      receiver_id: receiverId,
      amount: Amount,
      memo: Memo,
    },
    150_000_000_000_000, // gas to attach
    attach // yocto NEAR to attach
  )
    // After the smart contract method finishes a DataReceipt will be sent back
    // .then registers a method to handle that incoming DataReceipt
    .then<Nothing>(
      Context.contractName, // this contract's account id
      "transferFromRewardPoolCallback", // the method to call after the previous cross contract call finishes
      {},
      5_000_000_000_000, // gas to attach to the callback
      u128.Zero // yocto NEAR to attach to the callback
    )

    .returnAsResult(); // return the result of myCallback
}

export function transferFromRewardPoolCallback(): void {
  // an array of results from the previous cross contract calls
  // this array will have a length of 1, unless the previous
  // promises was created using ContractPromise.all
  logging.log("transfer done");
}

export function resetStake(): void {
  staking.set(context.sender, u128.Zero);
}

export function checkReward(accountId:string): u128 {
  const now: u64 = env.block_timestamp();
  const last_update: u64 = time.getSome(accountId);

  //const UPDATE_INTERVAL: u64 = 86400000000000 // 1 day
  //const UPDATE_INTERVAL: u64 = 120000000000; // 60 seconds
  const UPDATE_INTERVAL: u64 = 864000000000000  // 1 day
  
  const days: u64 = (now - last_update) / UPDATE_INTERVAL;
  const percentage: fraction = {
    numerator: u128.from<string>("30"),
    denominator: u128.from<string>("100"),
  };
  let initial = staking.getSome(accountId);
  let reward = u128.Zero;
  for (let i: u64 = 1; i <= days; ++i) {
    initial = u128.add(initial, reward);
    reward = u128.div(
      u128.mul(initial, percentage.numerator),
      percentage.denominator
    );
  }
  return reward;
}
