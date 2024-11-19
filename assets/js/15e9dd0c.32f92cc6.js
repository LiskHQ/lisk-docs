"use strict";(self.webpackChunklisk_docs=self.webpackChunklisk_docs||[]).push([[1674],{2888:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>r,contentTitle:()=>c,default:()=>h,frontMatter:()=>l,metadata:()=>s,toc:()=>a});var o=t(5893),i=t(1151);const l={title:"Deploying a new ERC-20 token on Lisk",description:"A guide on how to deploy a new ERC-20 token on Lisk.",keywords:["Lisk","Token development","Deploy token","ERC","EIP","ERC-20","Fungible token"]},c="How to deploy a new ERC-20 token on Lisk",s={id:"building-on-lisk/token-development/deploy-erc-20",title:"Deploying a new ERC-20 token on Lisk",description:"A guide on how to deploy a new ERC-20 token on Lisk.",source:"@site/docs/building-on-lisk/token-development/deploy-erc-20.md",sourceDirName:"building-on-lisk/token-development",slug:"/building-on-lisk/token-development/deploy-erc-20",permalink:"/lisk-documentation/building-on-lisk/token-development/deploy-erc-20",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{title:"Deploying a new ERC-20 token on Lisk",description:"A guide on how to deploy a new ERC-20 token on Lisk.",keywords:["Lisk","Token development","Deploy token","ERC","EIP","ERC-20","Fungible token"]},sidebar:"documentationSidebar",previous:{title:"Overview",permalink:"/lisk-documentation/token-development"},next:{title:"Deploying a new ERC-721 token on Lisk",permalink:"/lisk-documentation/building-on-lisk/token-development/deploy-erc-721"}},r={},a=[{value:"1. Open Remix",id:"1-open-remix",level:2},{value:"2. Create a new file",id:"2-create-a-new-file",level:2},{value:"3. Copy the example contract",id:"3-copy-the-example-contract",level:2},{value:"4. Compile the contract",id:"4-compile-the-contract",level:2},{value:"5. Deploy the contract",id:"5-deploy-the-contract",level:2},{value:"6. Verify the contract",id:"6-verify-the-contract",level:2}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,i.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"how-to-deploy-a-new-erc-20-token-on-lisk",children:"How to deploy a new ERC-20 token on Lisk"})}),"\n",(0,o.jsxs)(n.p,{children:["This guide explains how to deploy a new ERC-20 token to Lisk.\nIn case you want to bridge an existing token from Ethereum, please refer to the guide ",(0,o.jsx)(n.a,{href:"../add-token-to-lisk",children:"Bridging an L1 token to Lisk"}),"."]}),"\n",(0,o.jsx)(n.admonition,{type:"note",children:(0,o.jsxs)(n.p,{children:["We will use Remix IDE for smart contract development in this guide, but feel free to choose a ",(0,o.jsx)(n.a,{href:"/category/building-on-lisk/deploying-smart-contract",children:"smart contract development framework"})," of your choice to implement your token contract."]})}),"\n",(0,o.jsx)(n.h2,{id:"1-open-remix",children:"1. Open Remix"}),"\n",(0,o.jsxs)(n.p,{children:["Navigate to ",(0,o.jsx)(n.a,{href:"https://remix.ethereum.org",children:"Remix"})," in your browser."]}),"\n",(0,o.jsx)(n.h2,{id:"2-create-a-new-file",children:"2. Create a new file"}),"\n",(0,o.jsxs)(n.p,{children:["Inside the ",(0,o.jsx)(n.code,{children:"contracts"}),' folder, click the \ud83d\udcc4 ("Create new file") button to create a new empty Solidity file.\nYou can name this file whatever you\'d like, e.g., ',(0,o.jsx)(n.code,{children:"MyToken.sol"}),"."]}),"\n",(0,o.jsx)(n.h2,{id:"3-copy-the-example-contract",children:"3. Copy the example contract"}),"\n",(0,o.jsx)(n.p,{children:"Copy the following example contract into your new file:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-solidity",children:'// SPDX-License-Identifier: MIT\npragma solidity ^0.8.28;\n\nimport { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";\n\ncontract MyToken is ERC20 {\n    constructor(string memory _name, string memory _symbol, uint256 initialSupply) ERC20(_name, _symbol) {\n        _mint(msg.sender, initialSupply);\n    }\n    \n}\n'})}),"\n",(0,o.jsx)(n.h2,{id:"4-compile-the-contract",children:"4. Compile the contract"}),"\n",(0,o.jsxs)(n.p,{children:["Please double-check that the compiler version of the Remix IDE is matching  with the compiler version mentioned in the smart contract: ",(0,o.jsx)(n.code,{children:"pragma solidity ^0.8.28;"}),"."]}),"\n",(0,o.jsx)(n.p,{children:"Press the green play button at the top to compile the contract."}),"\n",(0,o.jsx)(n.h2,{id:"5-deploy-the-contract",children:"5. Deploy the contract"}),"\n",(0,o.jsxs)(n.p,{children:["Open the ",(0,o.jsx)(n.code,{children:"Deploy & run transactions"}),' tab (this looks like an Ethereum logo with an arrow pointing right).\nMake sure that your environment is set to "Injected Provider", your wallet is connected to the Lisk or Lisk Sepolia network, and Remix has access to your wallet.\nThen, select the ',(0,o.jsx)(n.code,{children:"MyToken"})," contract from the deployment dropdown and deploy it with the parameters of your choice, for example:"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"Name: MyToken"}),"\n",(0,o.jsx)(n.li,{children:"Symbol: MYT"}),"\n",(0,o.jsx)(n.li,{children:"InitalSupply: 1000000000000000000000"}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["Click on the orange ",(0,o.jsx)(n.code,{children:"transact"})," button to deploy the contract.\nFinally, confirm the contract deployment in your connected wallet."]}),"\n",(0,o.jsxs)(n.p,{children:["Check the Remix log messages; they should include the contract address.\nPaste this address in BlockScout, to see the contract in the Lisk blockchain explorer: ",(0,o.jsx)(n.a,{href:"https://sepolia-blockscout.lisk.com/address/0x6e8fF2E042c1637a2Da9563763c62362a3bbD712",children:"https://sepolia-blockscout.lisk.com/address/0x6e8fF2E042c1637a2Da9563763c62362a3bbD712"})]}),"\n",(0,o.jsxs)(n.p,{children:["In case you chose to deploy on the Lisk Mainnet, you need to paste the address on ",(0,o.jsx)(n.a,{href:"https://blockscout.lisk.com",children:"https://blockscout.lisk.com"})," instead."]}),"\n",(0,o.jsx)(n.h2,{id:"6-verify-the-contract",children:"6. Verify the contract"}),"\n",(0,o.jsx)(n.p,{children:"If you want to interact with your contract on the block explorer, you, or someone else needs to verify it first.\nThe above contract has already been verified, so you should be able to view your version on a block explorer already.\nFor the remainder of this guide, we'll walk through how to verify your contract with Remix on the Lisk Sepolia Testnet."}),"\n",(0,o.jsxs)(n.p,{children:["You can apply the same steps for verifying a contract on Lisk Mainnet in case you deployed it there in the previous step, just use ",(0,o.jsx)(n.a,{href:"https://blockscout.lisk.com",children:"https://blockscout.lisk.com"})," instead of ",(0,o.jsx)(n.a,{href:"https://sepolia-blockscout.lisk.com",children:"https://sepolia-blockscout.lisk.com"})," in step 2."]}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:["In Remix, rightlick on the contract you wish to verify and select ",(0,o.jsx)(n.code,{children:"Flatten"}),".\nThis will create a new file ",(0,o.jsx)(n.code,{children:"MyToken_flattened.sol"}),"."]}),"\n",(0,o.jsxs)(n.li,{children:["Now, switch to your ",(0,o.jsx)(n.a,{href:"https://sepolia-blockscout.lisk.com/address/0x6e8fF2E042c1637a2Da9563763c62362a3bbD712",children:"newly deployed contract"})," on ",(0,o.jsx)(n.a,{href:"https://sepolia-blockscout.lisk.com/",children:"https://sepolia-blockscout.lisk.com/"})]}),"\n",(0,o.jsxs)(n.li,{children:["Go to the contract tab and click on the blue ",(0,o.jsx)(n.code,{children:"Verify and Publish"})," button.","\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"(Optional) Set a license for your contract."}),"\n",(0,o.jsxs)(n.li,{children:["Choose ",(0,o.jsx)(n.code,{children:"Solidity (Single file)"})," as the verification method."]}),"\n",(0,o.jsx)(n.li,{children:"Choose the fitting compiler version for your contract."}),"\n",(0,o.jsx)(n.li,{children:"Disable code optimization."}),"\n",(0,o.jsxs)(n.li,{children:["Copy the flattened source code from Remix and paste it into the ",(0,o.jsx)(n.code,{children:"Enter the Solidity Contract Code"})," field."]}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["Check that all info is correct and click the ",(0,o.jsx)(n.code,{children:"Verify and Publish"})," button, to verify your contract."]}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"Once verified, the code tab will include the \u2705 icon, and the source code will be viewable."})]})}function h(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>s,a:()=>c});var o=t(7294);const i={},l=o.createContext(i);function c(e){const n=o.useContext(l);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:c(e.components),o.createElement(l.Provider,{value:n},e.children)}}}]);