"use strict";(self.webpackChunklisk_docs=self.webpackChunklisk_docs||[]).push([[6442],{7374:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>r,contentTitle:()=>a,default:()=>h,frontMatter:()=>t,metadata:()=>o,toc:()=>l});var s=n(5893),c=n(1151);const t={title:"Legacy Chain Service",slug:"/lisk-l1/legacy-chain-service",description:"How to access data from the Lisk L1 legacy chain.",keywords:["Lisk L1","Lisk legacy","Lisk legacy chain","legacy chain service","Lisk legacy account","chain history","account history"],difficulty:"beginner"},a="Legacy Chain Service",o={id:"lisk-l1/legacy-chain-service",title:"Legacy Chain Service",description:"How to access data from the Lisk L1 legacy chain.",source:"@site/i18n/ind/docusaurus-plugin-content-docs/current/lisk-l1/legacy-chain-service.md",sourceDirName:"lisk-l1",slug:"/lisk-l1/legacy-chain-service",permalink:"/lisk-documentation/ind/lisk-l1/legacy-chain-service",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{title:"Legacy Chain Service",slug:"/lisk-l1/legacy-chain-service",description:"How to access data from the Lisk L1 legacy chain.",keywords:["Lisk L1","Lisk legacy","Lisk legacy chain","legacy chain service","Lisk legacy account","chain history","account history"],difficulty:"beginner"},sidebar:"documentationSidebar",previous:{title:"Data Indexers",permalink:"/lisk-documentation/ind/lisk-tools/indexers"},next:{title:"Lisk L1->L2 migration guide",permalink:"/lisk-documentation/ind/building-on-lisk/migration-guide"}},r={},l=[{value:"Usage",id:"usage",level:2}];function d(e){const i={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",strong:"strong",ul:"ul",...(0,c.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(i.admonition,{type:"warning",children:(0,s.jsxs)(i.p,{children:["These docs are referring to the previous Lisk chain on L1, which stopped when Lisk migrated to L2 on May 2024.\nIf you wish to develop on the current Lisk L2 chain, please refer to the developer documentation under the ",(0,s.jsx)(i.a,{href:"../category/building-on-lisk",children:"Building on Lisk"})," category"]})}),"\n",(0,s.jsx)(i.header,{children:(0,s.jsx)(i.h1,{id:"legacy-chain-service",children:"Legacy Chain Service"})}),"\n",(0,s.jsxs)(i.p,{children:["To access data from the Legacy Lisk L1 chain, please use the legacy chain service available under ",(0,s.jsx)(i.a,{href:"https://legacy.lisk.com",children:"https://legacy.lisk.com"}),"."]}),"\n",(0,s.jsx)(i.h2,{id:"usage",children:"Usage"}),"\n",(0,s.jsx)(i.p,{children:"How to use the legacy chain service:"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsxs)(i.p,{children:["Get a ",(0,s.jsx)(i.strong,{children:"block by height"})," ",(0,s.jsx)(i.code,{children:"https://legacy.lisk.com/blocks/<BLOCK_HEIGHT>.json"})]}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsxs)(i.p,{children:["Get a ",(0,s.jsx)(i.strong,{children:"transaction by id"})," ",(0,s.jsx)(i.code,{children:"https://legacy.lisk.com/transactions/<TRANSACTION_ID>.json"})]}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsxs)(i.p,{children:["Get an ",(0,s.jsx)(i.strong,{children:"account by address"})," ",(0,s.jsx)(i.code,{children:"https://legacy.lisk.com/accounts/<LEGACY_ACCOUNT_ADDRESS>.json"})]}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsxs)(i.p,{children:["Get ",(0,s.jsx)(i.strong,{children:"histories by address"})," ",(0,s.jsx)(i.code,{children:"https://legacy.lisk.com/histories/<LEGACY_ACCOUNT_ADDRESS>.csv"})]}),"\n",(0,s.jsxs)(i.p,{children:["where ",(0,s.jsx)(i.code,{children:"<LEGACY_ACCOUNT_ADDRESS>"})," is the Lisk L1 address of the format:",(0,s.jsx)(i.code,{children:"lsk**************************************"})," or ",(0,s.jsx)(i.code,{children:"*******************L"})," (for uninitialized accounts)."]}),"\n",(0,s.jsxs)(i.p,{children:["If a Lisk L1 legacy account (",(0,s.jsx)(i.code,{children:"*******************L"})," address) was initialized, the entire history including that of the ",(0,s.jsx)(i.code,{children:"*******************L"})," legacy address will be consolidated under the corresponding ",(0,s.jsx)(i.code,{children:"lsk"})," address. The ",(0,s.jsx)(i.code,{children:"*******************L"})," address's history won't be available separately."]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(i.admonition,{title:"INFO: When is a Lisk L1 account initialized?",type:"info",children:(0,s.jsxs)(i.p,{children:["A Lisk L1 legacy account is considered initialized, if it either has an outgoing transaction on Lisk Core v2, or had performed a ",(0,s.jsx)(i.a,{href:"https://github.com/LiskArchive/lisk-core/blob/development/src/application/modules/legacy/commands/reclaim.ts",children:"legacy reclaim transaction"})," on Lisk Core v3/v4, prior to the Lisk L2 migration, which happened end of May 2024, at block height 24,823,618."]})})]})}function h(e={}){const{wrapper:i}={...(0,c.a)(),...e.components};return i?(0,s.jsx)(i,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},1151:(e,i,n)=>{n.d(i,{Z:()=>o,a:()=>a});var s=n(7294);const c={},t=s.createContext(c);function a(e){const i=s.useContext(t);return s.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function o(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(c):e.components||c:a(e.components),s.createElement(t.Provider,{value:i},e.children)}}}]);