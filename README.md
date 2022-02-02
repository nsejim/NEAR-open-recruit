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

More wireframes can be found in the `wireframes/` folder. Here are some examples showing how we envision the basic user interface elements.

**Create a Proposal**

![create-proposal](wireframes/create_proposal.png)

**Supporting a Proposal**

![support-project-proposal](wireframes/support_proposal_modal.png)

**Map of Projects**

![project-map](wireframes/project_map.png)

## File Structure (TODO)

This contract is designed to be self-contained and so may be extracted into your own projects and used as a starting point.  If you do decide to use this code, please pay close attention to all top level files including:

- NodeJS artifacts
  - `package.json`: JavaScript project dependencies and several useful scripts

- AssemblyScript artifacts
  - `asconfig.json`: AssemblyScript project (and per contract) configuration including workspace configuration
  - `as-pect.config.js`: as-pect unit testing dependency
  - `src/tsconfig.json`: load TypeScript types
  - `src/as_types.ts`: AssemblyScript types header file
  - `src/as-pect.d.ts`: as-pect unit testing types header file


The core file structure:

```
nearly-neighbors
├── README.md                           <-- this file
├── build                               <-- compiled contracts (WASM)
│   ├── debug
│   └── release
├── simulation
│   ├── Cargo.toml                      <-- simulation test config
│   └── src                             <-- simulation tests
│       ├── factory.rs
│       ├── lib.rs
│       ├── project.rs
│       └── proposal.rs
├── src
│   ├── factory                         <-- factory contract with:
│   │   ├── asconfig.json
│   │   ├── assembly                    <--   source code
│   │   │   └── index.ts
│   │   └── __tests__                   <--   unit tests
│   │       └── index.unit.spec.ts
│   ├── project                         <-- project contract with:
│   │   ├── asconfig.json
│   │   ├── assembly                    <--   source code
│   │   │   └── index.ts
│   │   └── __tests__                   <--   unit tests
│   │       └── index.unit.spec.ts
│   ├── proposal                        <-- proposal contract with:
│   │   ├── asconfig.json
│   │   ├── assembly                    <--   source code
│   │   │   └── index.ts
│   │   └── __tests__                   <--   unit tests
│   │       └── index.unit.spec.ts
│   └── utils.ts
└── wireframes                          <-- wireframe images
```

## Contracts

There are three contracts that make up this project.

By breaking out the logic into multiple contracts, we are employing NEAR development best practices which will make the code more secure (through rigorous testing of separated concerns) and robust (enabling complex features through [cross-contract calls](https://docs.near.org/docs/tutorials/how-to-write-contracts-that-talk-to-each-other)).

### Proposal

The proposal contract represents a user's proposed idea for a development project.

Proposals are created by users (mediated by the [factory](#factory)) and hold data like:

- Project details (what, where, why)
- Funding parameters (target amount, minimum pledge, due date)

The proposal accepts funding from _supporters_.

If proposals are fully funded by their due date, then they are closed and converted to a [project](#project) (with all funds transferred to the new project's account).
If proposals do not meet their funding goals, then they are closed and all funds are returned to the supporters.

### Project

The project contract represents a fully-funded proposal. It is managed by a _project owner_, who is authorized to access the project's NEAR tokens so that they can put those funds into use by actually executing on the real-world project.

Projects are created automatically by the [factory](#factory) from a fully-funded [proposal](#proposal). Projects maintain a reference to their original proposal for proper record-keeping.

Projects track their own real-world progress by reporting on key stats like:

- Amount of funds used
- % progress towards completion

### Factory (TO UNDERSTAND)

The factory is a behind-the-scenes contract which takes care of the creation and setup of [proposals](#proposal) and [projects](#project). Instead of human users creating proposal and project contracts directly, they instead send requests to the factory which handles the necessary tasks for them.

This is a pattern you'll see frequently in NEAR (and other blockchain) development: designating a contract with the responsibility for managing the lifecycle of other contracts. It helps abstract out the routine tasks of contract initialization and setup, limiting tedious user interactions and thus avoiding potential for user error.

## Live DApps on NEAR testnet (DONE)

The 2 smart-contracts have been deployed on NEAR testnet under the following accounts:
- openproofs.ncd.nsejim.testnet
- openboard.ncd.nsejim.testnet

### Future Development (DONE)

Some ideas for future feature development:

- Enable each recruiter to open its own open jobboard

### Key Contributors (DONE)

- [Jimmy NSENGA - @amgando](https://github.com/nsejim)
