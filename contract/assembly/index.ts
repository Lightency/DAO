import { context, logging, PersistentVector, storage, u128,PersistentMap } from 'near-sdk-as'
import { Context, ContractPromise } from "near-sdk-core";
import {Proposal, proposals} from './model';
const approves = new PersistentMap<string, u64>("a:");
const data_yes= new PersistentVector<PersistentMap<string,u64>>("c");
const data_no= new PersistentVector<PersistentMap<string,u64>>("d");
const history_yes= new PersistentVector<PersistentMap<u64,string>>("e");
const history_no=new PersistentVector<PersistentMap<u64,string>>("f");


export function get_num(proposalID:i32): u64 {
  return storage.getPrimitive<u64>("counter"+proposalID.toString(), 0);
}


// Public method - Increment the counter
export function increment(proposalID:i32): void {
  const new_value = get_num(proposalID)+1;
  storage.set<u64>("counter"+proposalID.toString(), new_value);
  logging.log("Increased number to " +  new_value.toString());
}

export function get_num_yes(proposalID:i32): u64 {
  return storage.getPrimitive<u64>("counterYes"+proposalID.toString(), 0);
}


// Public method - Increment the counter
export function increment_yes(proposalID:i32): void {
  const new_value = get_num_yes(proposalID)+1;
  storage.set<u64>("counterYes"+proposalID.toString(), new_value);
  logging.log("Increased number to " +  new_value.toString());
}
export function get_num_no(proposalID:i32): u64 {
  return storage.getPrimitive<u64>("counterNo"+proposalID.toString(), 0);
}


// Public method - Increment the counter
export function increment_no(proposalID:i32): void {
  const new_value = get_num_no(proposalID)+1;
  storage.set<u64>("counterNo"+proposalID.toString(), new_value);
  logging.log("Increased number to " +  new_value.toString());
}



export function keyFrom(address:string, voting_count: u64): string {
  return address + ":" + voting_count.toString();
}


export function vote(proposalID:i32,voteType:u64):u64{
let num_votes:u64=1;
if(voteType==1){
  if(!data_yes[proposalID].contains(context.sender)){
    //assert((num_votes*num_votes) <= getBalance(context.sender), "not enough tokens to vote");
    data_yes[proposalID].set(context.sender,num_votes);
    
    
    
    
  }
  else{
    let num_votes=data_yes[proposalID].getSome(context.sender);
    num_votes++;
    //assert((num_votes*num_votes) <= getBalance(context.sender), "not enough tokens to vote");
    data_yes[proposalID].set(context.sender,num_votes);

  }
  increment_yes(proposalID);
  let vote_count=data_yes[proposalID].getSome(context.sender);
  //transfer("light.sputnikv2.testnet",vote_count*vote_count); //TODO : CHANGE THE ADDRESS TO RECIEVE THE COINS WHEN VOTING!!
  history_yes[proposalID].set(get_num_yes(proposalID),keyFrom(context.sender,vote_count));

}
else{
  if(!data_no[proposalID].contains(context.sender)){
    //assert((num_votes*num_votes) <= getBalance(context.sender), "not enough tokens to vote");
    data_no[proposalID].set(context.sender,num_votes);
    
    
  }
  else{
    let num_votes=(data_no[proposalID].getSome(context.sender));
    num_votes++;
    //assert((num_votes*num_votes) <= getBalance(context.sender), "not enough tokens to vote");
    data_no[proposalID].set(context.sender,num_votes);

  }
  increment_no(proposalID);
  let vote_count=data_no[proposalID].getSome(context.sender);
 
  //transfer("light.sputnikv2.testnet",vote_count*vote_count); //TODO : CHANGE THE ADDRESS TO RECIEVE THE COINS WHEN VOTING!!
  history_no[proposalID].set(get_num_no(proposalID),keyFrom(context.sender,vote_count));

  

}  
const title=proposals[proposalID].title;
const description=proposals[proposalID].description;
const url=proposals[proposalID].url;
const id=proposals[proposalID].id;
const histYes=historyYes(id);
const histNo=historyNo(id);
proposals[proposalID]=new Proposal(title,description,url,id,<i32>get_num_yes(proposalID),<i32>get_num_no(proposalID),histYes,histNo);
return num_votes;
}



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
  const accountId = context.sender
  // Use logging.log to record logs permanently to the blockchain!
  logging.log(`Saving greeting "${message}" for account "${accountId}"`)
  storage.set(accountId, message)
}




export function addProposal(title: string, description: string, url: string): void {
  // Creating a new entry and populating fields with our data
  const entry = new Proposal(title, description, url, proposals.length, 0,0,'','');
  // Adding the entry to end of the the persistent collection
  proposals.push(entry);
  const dataMapYes=new PersistentMap<string,u64>("datamapYes"+proposals.length.toString());
  const dataMapNo=new PersistentMap<string,u64>("datamapNo"+proposals.length.toString());
  const dataHistoryYes=new PersistentMap<u64,string>("dataHistoryYes"+proposals.length.toString());
  const dataHistoryNo=new PersistentMap<u64,string>("dataHistoryNo"+proposals.length.toString());
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



export function historyYes(proposalID:i32):string{
  let ch="";
  for (let i: u64 = 1; i <= get_num_yes(proposalID); i++) {
      ch=ch+history_yes[proposalID].getSome(i)+'\n';
    }
    return ch;
}

export function historyNo(proposalID:i32):string{
  let ch="";
  for (let i: u64 = 1; i <= get_num_no(proposalID); i++) {
      ch=ch+history_no[proposalID].getSome(i)+'\n';
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

export function myFirstCrossContractCall(accountId: string): void {
  // Invoke a method on another contract
  // This will send an ActionReceipt to the shard where the contract lives.
  ContractPromise.create<FTBalanceOf>(
    "potato_token.testnet", // contract account id
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

  if (result.succeeded) {
    // the cross contract call succeeded
    const balance = result.decode<u128>();

  
}
const balance = result.decode<u128>();
return balance;
}

@nearBindgen
class NearToEth {
  eth_recipient:string;
  amount:u128;
}
export function NearEth(ethRecipient:string, depositAmount:u128): void {
// Inside a contract function on ContractA, a cross contract call is started
// From ContractA to ContractB
ContractPromise.create<NearToEth>(
  "rustcontract.testnet", // contract account id
  "crosscontract_call_rust", // // contract method name
  {
    eth_recipient: ethRecipient,
    amount: depositAmount,

  },
  20_000_000_000_000, // gas to attach
  u128.Zero // yocto NEAR to attach
)
.then<Nothing>(
  Context.contractName, // this contract's account id
  "rustCallback", // the method to call after the previous cross contract call finishes
  {},
  5_000_000_000_000, // gas to attach to the callback
  u128.Zero // yocto NEAR to attach to the callback
)

.returnAsResult(); // return the result of myCallback
}
export function rustCallback(): string {
  let ch=""
  // an array of results from the previous cross contract calls
  // this array will have a length of 1, unless the previous
  // promises was created using ContractPromise.all
  const results = ContractPromise.getResults();
  if(results.length == 1){ ch="this is our callback function";}
  return ch;
}

