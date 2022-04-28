import {addProposal, getProposals} from '../index';
import {Proposal, proposals} from '../model';
import {VMContext, Context, u128} from 'near-sdk-as';

function createEntry(title: string, description: string, url: string): Proposal {
  return new Proposal(title, description, url, 0, u128.fromU64(0));
}

const entry = createEntry('Near Protocol - Infrastructure for Innovation',
  'NEAR is an open source platform that accelerates the development of decentralized applications.',
  'https://near.org/');

describe('entries tests', () => {
  afterEach(() => {
    while (proposals.length > 0) {
      proposals.pop();
    }
  });

  it('adds a entry', () => {
    addProposal('Near Protocol - Infrastructure for Innovation',
      'NEAR is an open source platform that accelerates the development of decentralized applications.',
      'https://near.org/');
    expect(proposals.length).toBe(
      1,
      'should only contain one entry'
    );
    expect(proposals[0].url).toStrictEqual(
      'https://near.org/',
      'url matches'
    );
  });

  it('check up vote', () => {
    addProposal('Near Protocol - Infrastructure for Innovation',
      'NEAR is an open source platform that accelerates the development of decentralized applications.',
      'https://near.org/');
    expect(proposals[0].votes.toString()).toStrictEqual(u128.fromU32(0).toString(),
      'entry should have 0 vote'
    );
    VMContext.setAttached_deposit(u128.from('10000000000000000000000'));
    // upVoteEntry(i32(0));
    // expect(entries[0].votes.toString()).toStrictEqual(u128.from('10000000000000000000000').toString(),
    //   'entry should have a vote'
    // );
  });

  it('retrieves entries', () => {
    addProposal('Near Protocol - Infrastructure for Innovation',
      'NEAR is an open source platform that accelerates the development of decentralized applications.',
      'https://near.org/');
    const entriesList = getProposals();
    expect(entriesList.length).toBe(
      1,
      'should be one entry'
    );
    expect(entriesList).toIncludeEqual(
      entry,
      'entries should include:\n' + entry.toJSON()
    );
  });
});

describe('attached deposit tests', () => {
  beforeEach(() => {
    VMContext.setAttached_deposit(u128.fromString('0'));
    VMContext.setAccount_balance(u128.fromString('0'));
  });

  it('attaches a deposit to a contract call', () => {
    log('Initial account balance: ' + Context.accountBalance.toString());

    addProposal('Near Protocol - Infrastructure for Innovation',
      'NEAR is an open source platform that accelerates the development of decentralized applications.',
      'https://near.org/');
    VMContext.setAttached_deposit(u128.from('10'));

    log('Attached deposit: 10');
    log('Account balance after deposit: ' + Context.accountBalance.toString());

    expect(Context.accountBalance.toString()).toStrictEqual(
      '10',
      'balance should be 10'
    );
  });
});
