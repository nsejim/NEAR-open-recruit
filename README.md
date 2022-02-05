# OpenRecruit

OpenRecruit is a multi smart contract DApp to proof the concept of an open and trustless recruitment process running on NEAR Blockchain Protocol. 

## Concept (DONE)

Today's online recruitment services experience different trust-related challenges that natively result from the centralized architecture of their online jobboards. The latters are the user interfaces for posting jobs (recruiter user) and submitting applications (job candidate). 

To name a few of those challenges:
  - a job candidate has to upload its proofs of qualification in each of different jobboards where he/she want to apply for a job
  - once application submiited, the candidate has to trust the online service to effectively transmit its application to the recruiter
  - it is not guaranteed that jobs posted under the same publication package (price) are listed in the pre-defined order (newest on top foe instance) 

With the proposed collaborative smart contracts, we empower both type of users in the following ways:
  1. A candidate can manage his/her open proofs of qualification in an open way
  2. A candidate can verify if the recruiter has effectively consulted his/her application
  3. Recruiters can verify that the positions of their jobs in the listing is as promised 

### Example Story (DONE)

Let's describe a typical end to end user story as a sequence of actions from the following different type of users:
  1. Two recruiters: "NEAR" and "TESLA" 
  2. One candidate "Alice" 

The following actions
  1. Each recruiter registers as Recruiter
  2. Each recruiter posts one or several jobs on the "open recruitment" jobboard. 
  3. Alice upload her open proofs of qualifications in the OpenProofs Dapp.
  4. Alice visits the "open recruitment" jobboard and she opens the "RUST developer" job at "NEAR" for applying. 
  5. On the application form, Alice checks the box authorizing to link its "open proofs" information to the submitted application.
  6. The NEAR recruiter receives the Alice's application and ack its reception


## Repository contents (TODO)

This repository includes:

- Two smart contracts
- [Unit tests](https://docs.near.org/docs/roles/developer/contracts/test-contracts#unit-tests) and [simulation tests](https://docs.near.org/docs/roles/developer/contracts/test-contracts#simulation-tests) for the contract(s)
- Wireframes for the potential dApp UI of each smart contract
- Utilities for building, testing, and deploying contracts (facilitated by the [NEAR CLI](https://docs.near.org/docs/development/near-cli))

### Installation

1. clone this repo
2. run `yarn install` (or `npm install`)
3. run `yarn build` (or `npm run build`)
4. run `yarn test` (or `npm run test`)
5. explore the contents of `src/`

See below for more convenience scripts ...

### Commands (TODO)

**Compile source to WebAssembly**

```sh
yarn build                    # asb --target debug
yarn build:release            # asb
```

**Run unit tests**

```sh
yarn test:unit                # asp --verbose --nologo -f unit.spec
```

**Run simulation tests**

These tests can be run from within VSCode (or any Rust-compatible IDE) or from the command line.

_NOTE: Rust is required_

```sh
yarn test:simulate            # yarn build:release && cargo test -- --nocapture
```

**Run all tests**

```sh
yarn test                     # yarn test:unit && test:simulate
```


## UI Wireframes (TODO)

## File Structure (TODO)



### Factory (TO UNDERSTAND)



## Live DApps on NEAR testnet (DONE)

The 2 smart-contracts have been deployed on NEAR testnet under the following accounts:
- openproofs.ncd.nsejim.testnet
- openboard.ncd.nsejim.testnet

### Future Development (DONE)

Some ideas for future feature development:

- Enable each recruiter to open its own open jobboard

### Key Contributors (DONE)

- [Jimmy NSENGA - @amgando](https://github.com/nsejim)
