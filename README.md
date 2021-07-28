# SmartistContract

_Important: this project is in alpha and should not be used in production just yet_

The SmartistContract is a simple spec-compliant ERC721 contract that allows a digital artist to mint work on their own contract instead of using a shared contract on an NFT platform. Many collectors have strong feelings about artist provenance, and we needed such a contract for [Wrasslers](https://wrasslers.com) so we built this at 0xEssential and decided to open source it to give back to the community. The smart contract includes on-chain royalties per EIP 2981.

This repo also includes a small NextJS app that allows an artist to pin metadata and an asset on IPFS and then mint a token against the contract directly to their wallet.

NFTs created via this contract and minting flow are regular old NFTs - you can create an OpenSea collection for the contract, your token owners will be able to freely sell the tokens they own on any platform. But this is a simple contract that's most appropriate for tokenizing digital art - the included contract doesn't put art on chain, do anything generative or any of the boundary-pushing stuff cutting-edge crypto artists are exploring. It's most appropriate for a digital artist who through NFTs now has a new market for their work, and is a good alternative to something like OpenSea lazy minting.

## Prerequisites

The first thing to understand about this project is that in its current state, you need to at least be comfortable using the command line on your machine. Our goal is to work towards making this project more accessible to artists who do not code, but in the current state you need to be somewhat technical, or at least have a developer friend who can help walk you through this all. Feel free to reach [@0xEssential](https://twitter.com/0xessential) on Twitter and we'll see how we can help you out!

If you're confident about your command line skills and want to proceed, you will also need accounts / API keys from the following services. All of these services are free.

**MetaMask**

If you don't already have MetaMask installed then this project is likely not suitable for your needs.

**Github**

Not totally necessary, but using a Github account to utilize this template repo makes your life a bit easier.

**Infura**

Infura provides APIs to the Ethereum blockchain. For this project a free API key is sufficient. Sign up at <https://infura.io> - you will need your API key from the Infura dashboard.

**NFT Storage**

NFT.storage is a project from Protocol Labs that makes it easy to pin NFT assets and metadata to IPFS. The minting app uses this API key to allow you to pin your assets before minting. Sign up for free at <https://nft.storage> - you will need an API key.

**Etherscan**

This project will automatically verify your contract code on Etherscan after deployment. To do so, you need an Etherscan API key, which you can get at <https://etherscan.io/apis>

## Getting started

This Github repo is a "template" repo, which means you can utilize it with a clean git history. Get started by clicking the "Use this template" button up and to the right, which will create a new repository in your account. For security reasons, it's best to keep this repo private such that we don't mistakenly leak your seed phrase or private key.

This repo is also what's called a "monorepo" that includes multiple projects via yarn workspaces. There is a smart contract project under `contract` while the minting dapp is in the `mint-app` directory. These projects work together to help you deploy your own contract and then mint tokens against it to your own wallet.

Once you've created your own repo off of this template, generally you need to pull the code from your repository to your local machine. Explaining how git works is unfortunately a bit out of scope here, but there are tons of blog posts and help articles, and a dev friend of yours could get this solved with you very quickly. But if you're already intimated, it might be best to wait to use this project until we've made it a bit more accessible to non-engineers.

## Setup

Here's where we sort of skip over a lot of stuff and assume you are comfortable on the command line and have pulled your repo to your local machine.

The approach we've taken with SmartistContract is to push all of the customization into your environment. Ideally you shouldn't need to edit any code in the repo, but instead set some variables in `.env` and be able to deploy your contract.

## SCRIPTS

Here is the list of npm scripts you can execute:

Some of them relies on [./scripts.js](./scripts.js) to allow parameterizing it via command line argument (have a look inside if you need modifications)
<br/><br/>

`yarn prepare`

As a standard lifecycle npm script, it is executed automatically upon install. It generate config file and typechain to get you started with type safe contract interactions
<br/><br/>

`yarn lint`, `yarn lint:fix`, `yarn format` and `yarn format:fix`

These will lint and format check your code. the `:fix` version will modifiy the files to match the requirement specified in `.eslintrc` and `.prettierrc.`
<br/><br/>

`yarn compile`

These will compile your contracts
<br/><br/>

`yarn void:deploy`

This will deploy your contracts on the in-memory hardhat network and exit, leaving no trace. quick way to ensure deployments work as intended without consequences
<br/><br/>

`yarn test [mocha args...]`

These will execute your tests using mocha. you can pass extra arguments to mocha
<br/><br/>

`yarn coverage`

These will produce a coverage report in the `coverage/` folder
<br/><br/>

`yarn gas`

These will produce a gas report for function used in the tests
<br/><br/>

`yarn dev`

These will run a local hardhat network on `localhost:8545` and deploy your contracts on it. Plus it will watch for any changes and redeploy them.
<br/><br/>

`yarn local:dev`

This assumes a local node it running on `localhost:8545`. It will deploy your contracts on it. Plus it will watch for any changes and redeploy them.
<br/><br/>

`yarn exec <network> <file.ts> [args...]`

This will execute the script `<file.ts>` against the specified network
<br/><br/>

`yarn deploy <network> [args...]`

This will deploy the contract on the specified network.

Behind the scene it uses `hardhat deploy` command so you can append any argument for it
<br/><br/>

`yarn export <network> <file.json>`

This will export the abi+address of deployed contract to `<file.json>`
<br/><br/>

`yarn fork:exec <network> [--blockNumber <blockNumber>] [--deploy] <file.ts> [args...]`

This will execute the script `<file.ts>` against a temporary fork of the specified network

if `--deploy` is used, deploy scripts will be executed
<br/><br/>

`yarn fork:deploy <network> [--blockNumber <blockNumber>] [args...]`

This will deploy the contract against a temporary fork of the specified network.

Behind the scene it uses `hardhat deploy` command so you can append any argument for it
<br/><br/>

`yarn fork:test <network> [--blockNumber <blockNumber>] [mocha args...]`

This will test the contract against a temporary fork of the specified network.
<br/><br/>

`yarn fork:dev <network> [--blockNumber <blockNumber>] [args...]`

This will deploy the contract against a fork of the specified network and it will keep running as a node.

Behind the scene it uses `hardhat node` command so you can append any argument for it
