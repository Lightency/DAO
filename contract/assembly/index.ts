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

import { Context, logging, storage, u128 } from 'near-sdk-as'
import {Proposal, proposals} from './model';

const DEFAULT_MESSAGE = 'Hello'

// Exported functions will be part of the public interface for your smart contract.
// Feel free to extract behavior to non-exported functions!
export function getGreeting(accountId: string): string | null {
  // This uses raw `storage.get`, a low-level way to interact with on-chain
  // storage for simple contracts.
  // If you have something more complex, check out persistent collections:
  // https://docs.near.org/docs/concepts/data-storage#assemblyscript-collection-types
  return storage.get<string>(accountId, DEFAULT_MESSAGE)
}

export function setGreeting(message: string): void {
  const accountId = Context.sender
  // Use logging.log to record logs permanently to the blockchain!
  logging.log(`Saving greeting "${message}" for account "${accountId}"`)
  storage.set(accountId, message)
}




export function addProposal(title: string, description: string, url: string): void {
  // Creating a new entry and populating fields with our data
  const entry = new Proposal(title, description, url, proposals.length, u128.fromU64(0));
  // Adding the entry to end of the the persistent collection
  proposals.push(entry);
}


export function getProposals(): Proposal[] {
  const result = new Array<Proposal>(proposals.length);
  for (let i = 0; i < proposals.length; i++) {
    result[i] = proposals[i];
  }
  return result;
}
