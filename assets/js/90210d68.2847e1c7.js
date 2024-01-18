"use strict";(self.webpackChunklisk_docs=self.webpackChunklisk_docs||[]).push([[240],{7681:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>c,contentTitle:()=>i,default:()=>h,frontMatter:()=>a,metadata:()=>s,toc:()=>l});var o=n(5893),r=n(1151);const a={title:"How to deploy a smart contract (Hardhat)",slug:"/building-on-lisk/deploying-a-smart-contract",description:"A guide on deploying a smart contract on the Lisk test network using Hardhat. Includes instructions for setting up the environment, compiling, and deploying the smart contract.",keywords:["Hardhat","smart contract","ERC-721","Lisk","Lisk test network","Lisk testnet","Node.js","Solidity","smart contract deployment","deploy a smart contract","deploying smart contracts","build on lisk","write smart contract","smart contract development"]},i="How to deploy a smart contract (Hardhat)",s={id:"building-on-lisk/deploying-a-smart-contract",title:"How to deploy a smart contract (Hardhat)",description:"A guide on deploying a smart contract on the Lisk test network using Hardhat. Includes instructions for setting up the environment, compiling, and deploying the smart contract.",source:"@site/docs/building-on-lisk/deploying-a-smart-contract.md",sourceDirName:"building-on-lisk",slug:"/building-on-lisk/deploying-a-smart-contract",permalink:"/lisk-documentation/building-on-lisk/deploying-a-smart-contract",draft:!1,unlisted:!1,editUrl:"https://github.com/LiskHQ/lisk-documentation/tree/main/docs/building-on-lisk/deploying-a-smart-contract.md",tags:[],version:"current",frontMatter:{title:"How to deploy a smart contract (Hardhat)",slug:"/building-on-lisk/deploying-a-smart-contract",description:"A guide on deploying a smart contract on the Lisk test network using Hardhat. Includes instructions for setting up the environment, compiling, and deploying the smart contract.",keywords:["Hardhat","smart contract","ERC-721","Lisk","Lisk test network","Lisk testnet","Node.js","Solidity","smart contract deployment","deploy a smart contract","deploying smart contracts","build on lisk","write smart contract","smart contract development"]},sidebar:"documentationSidebar",previous:{title:"Connecting to a wallet",permalink:"/lisk-documentation/connecting-to-a-wallet"}},c={},l=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Creating a project",id:"creating-a-project",level:2},{value:"Configuring Hardhat with Lisk",id:"configuring-hardhat-with-lisk",level:2},{value:"Creating the contract",id:"creating-the-contract",level:2},{value:"Compiling the smart contract",id:"compiling-the-smart-contract",level:2},{value:"Deploying the smart contract",id:"deploying-the-smart-contract",level:2},{value:"Verifying the Smart Contract",id:"verifying-the-smart-contract",level:3}];function d(t){const e={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",...(0,r.a)(),...t.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(e.h1,{id:"how-to-deploy-a-smart-contract-hardhat",children:"How to deploy a smart contract (Hardhat)"}),"\n",(0,o.jsx)(e.h2,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,o.jsx)(e.h2,{id:"creating-a-project",children:"Creating a project"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-bash",children:"% npx hardhat\n"})}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{children:"\u2714 What do you want to do? \xb7 Create a TypeScript project\n\u2714 Hardhat project root: \xb7 /Users/mona/git/hardhat-test\n\u2714 Do you want to add a .gitignore? (Y/n) \xb7 y\n\u2714 Help us improve Hardhat with anonymous crash reports & basic usage data? (Y/n) \xb7 y\n\u2714 Do you want to install this sample project's dependencies with npm (@nomicfoundation/hardhat-toolbox)? (Y/n) \xb7 y\n"})}),"\n",(0,o.jsx)(e.h2,{id:"configuring-hardhat-with-lisk",children:"Configuring Hardhat with Lisk"}),"\n",(0,o.jsx)(e.p,{children:"In order to deploy smart contracts to the Lisk network, you will need to configure your Hardhat project and add the Lisk network."}),"\n",(0,o.jsxs)(e.p,{children:["This example uses ",(0,o.jsx)(e.a,{href:"https://www.npmjs.com/package/dotenv",children:"dotenv"})," to load the ",(0,o.jsx)(e.code,{children:"WALLET_KEY"})," environment variable from a ",(0,o.jsx)(e.code,{children:".env"})," file to ",(0,o.jsx)(e.code,{children:"process.env.WALLET_KEY"}),". You should use a similar method to avoid hardcoding your private keys within your source code."]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-bash",children:"npm install --save-dev dotenv\n"})}),"\n",(0,o.jsxs)(e.p,{children:["Once you have ",(0,o.jsx)(e.code,{children:"dotenv"})," installed, create a ",(0,o.jsx)(e.code,{children:".env"})," file with the following content:"]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{children:"WALLET_KEY=<YOUR_PRIVATE_KEY>\n"})}),"\n",(0,o.jsxs)(e.p,{children:["Substite ",(0,o.jsx)(e.code,{children:"<YOUR_PRIVATE_KEY>"})," with the private key for your wallet."]}),"\n",(0,o.jsx)(e.admonition,{type:"caution",children:(0,o.jsxs)(e.p,{children:[(0,o.jsx)(e.code,{children:"WALLET_KEY"})," is the private key of the wallet to use when deploying a contract. Follow the instructions of your wallet on how to get your private key. E.g. for ",(0,o.jsx)(e.strong,{children:"MetaMask"}),", please follow these ",(0,o.jsx)(e.a,{href:"https://support.metamask.io/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key",children:"instructions"}),". ",(0,o.jsx)(e.strong,{children:"It is critical that you do NOT commit this to a public repo"})]})}),"\n",(0,o.jsxs)(e.p,{children:["To configure Hardhat to use Lisk, add Lisk as a network to your project's ",(0,o.jsx)(e.code,{children:"hardhat.config.ts"})," file:"]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-ts",metastring:'title="hardhat.config.ts"',children:"import { HardhatUserConfig } from \"hardhat/config\";\nimport \"@nomicfoundation/hardhat-toolbox\";\n\nrequire('dotenv').config();\n\nconst config: HardhatUserConfig = {\n  solidity: \"0.8.19\",\n  networks: {\n    // for testnet\n    'lisk-sepolia': {\n      url: 'https://rpc.sepolia-api.lisk.com',\n      accounts: [process.env.WALLET_KEY as string],\n      gasPrice: 1000000000,\n    },\n  },\n};\n\nexport default config;\n"})}),"\n",(0,o.jsx)(e.h2,{id:"creating-the-contract",children:"Creating the contract"}),"\n",(0,o.jsxs)(e.p,{children:["For ease and security, we\u2019ll use the ",(0,o.jsx)(e.code,{children:"ERC721"})," interface provided by the ",(0,o.jsx)(e.a,{href:"https://docs.openzeppelin.com/contracts/5.x/",children:"OpenZeppelin Contracts library"})," to create an NFT smart contract.\nWith OpenZeppelin, we don\u2019t need to write the whole ERC-721 interface. Instead, we can import the library contract and use its functions."]}),"\n",(0,o.jsx)(e.p,{children:"To add the OpenZeppelin Contracts library to your project, run:"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-bash",children:"npm install --save @openzeppelin/contracts\n"})}),"\n",(0,o.jsxs)(e.p,{children:["In your project, delete the ",(0,o.jsx)(e.code,{children:"contracts/Lock.sol"})," contract that was generated with the project.\n(You can also delete the ",(0,o.jsx)(e.code,{children:"test/Lock.ts"})," test file, but you should add your own tests ASAP!)."]}),"\n",(0,o.jsxs)(e.p,{children:["Add the code below to a new file called ",(0,o.jsx)(e.code,{children:"contracts/NFT.sol"}),"."]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-sol",metastring:'title="contracts/NFT.sol"',children:'// SPDX-License-Identifier: MIT\npragma solidity ^0.8.23;\n\nimport "@openzeppelin/contracts/token/ERC721/ERC721.sol";\n\ncontract NFT is ERC721 {\n    uint256 public currentTokenId;\n\n    constructor() ERC721("NFT Name", "NFT") {}\n\n    function mint(address recipient) public payable returns (uint256) {\n        uint256 newItemId = ++currentTokenId;\n        _safeMint(recipient, newItemId);\n        return newItemId;\n    }\n}\n'})}),"\n",(0,o.jsx)(e.h2,{id:"compiling-the-smart-contract",children:"Compiling the smart contract"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-bash",children:"npx hardhat compile\n"})}),"\n",(0,o.jsx)(e.h2,{id:"deploying-the-smart-contract",children:"Deploying the smart contract"}),"\n",(0,o.jsx)(e.p,{children:"Once your contract has been successfully compiled, you can deploy the contract to the Base Sepolia test network."}),"\n",(0,o.jsxs)(e.p,{children:["To deploy the contract to the Base Sepolia test network, you'll need to modify the ",(0,o.jsx)(e.code,{children:"scripts/deploy.ts"})," in your project:"]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-ts",metastring:'title="scripts/deploy.ts"',children:"import { ethers } from 'hardhat';\n\nasync function main() {\n  const nft = await ethers.deployContract('NFT');\n\n  await nft.waitForDeployment();\n\n  console.log('NFT Contract Deployed at ' + nft.target);\n}\n\n// We recommend this pattern to be able to use async/await everywhere\n// and properly handle errors.\nmain().catch((error) => {\n  console.error(error);\n  process.exitCode = 1;\n});\n"})}),"\n",(0,o.jsx)(e.p,{children:"You'll also need testnet ETH in your wallet."}),"\n",(0,o.jsxs)(e.p,{children:["See the ",(0,o.jsx)(e.a,{href:"#prerequisites",children:"Prerequisites"})," if you haven't done that yet.\nOtherwise, the deployment attempt will fail."]}),"\n",(0,o.jsx)(e.p,{children:"Finally, run:"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-bash",children:"npx hardhat run scripts/deploy.ts --network lisk-sepolia\n"})}),"\n",(0,o.jsx)(e.p,{children:"The contract will be deployed on the Lisk Sepolia Testnet.\nYou can view the deployment status and contract by using a block explorer and searching for the address returned by your deploy script."}),"\n",(0,o.jsx)(e.p,{children:"If you're deploying a new or modified contract, you'll need to verify it first."}),"\n",(0,o.jsx)(e.h3,{id:"verifying-the-smart-contract",children:"Verifying the Smart Contract"})]})}function h(t={}){const{wrapper:e}={...(0,r.a)(),...t.components};return e?(0,o.jsx)(e,{...t,children:(0,o.jsx)(d,{...t})}):d(t)}},1151:(t,e,n)=>{n.d(e,{Z:()=>s,a:()=>i});var o=n(7294);const r={},a=o.createContext(r);function i(t){const e=o.useContext(a);return o.useMemo((function(){return"function"==typeof t?t(e):{...e,...t}}),[e,t])}function s(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(r):t.components||r:i(t.components),o.createElement(a.Provider,{value:e},t.children)}}}]);