import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';
import Translate from '@docusaurus/Translate';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title desktop_only">
        <Translate>Welcome to the Lisk documentation 🎉</Translate>
        </Heading>

        <Heading as="h1" className="hero__title mobile_only">
        <Translate>Welcome</Translate>
          <br></br>
          <Translate>to the Lisk</Translate>
          <br></br>
          <Translate>documentation 🎉</Translate>
        </Heading>
        <p className="hero__subtitle line-space-subtile"><Translate>Explore our comprehensive knowledge base tailored for both developers and users! Find in-depth technical information and helpful guides all about the Lisk blockchain.</Translate></p>
        <div>
          <img src='/img/built-superchain-white.svg' className='superchain-white'></img>
          <img src='/img/built-superchain-black.svg' className='superchain-black'></img>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <div>
          <table>
  <thead>
    <tr>
      <th colspan="3">About Lisk</th>
    </tr>
    <tr>
      <th colspan="3">
      ℹ️ [Network Info](./about-lisk/network-info.md)<br/>
      📜 [Contracts](./about-lisk/contracts.mdx)<br/>
      💎 [Deployed Tokens](./about-lisk/deployed-tokens.md)<br/>
      📟 [Fees](./about-lisk/fees.md)
      </th>
    </tr>
  </thead>  
  <tbody>
    <tr>
      <th>Building on Lisk</th>
      <th>Using Lisk</th>
    </tr>
    <tr>
      <td>
        <table>
          <thead>
            <tr>
              <th>Deploying a Smart Contract</th>
              <th>Interacting with the blockchain</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
              - [...with Foundry](./building-on-lisk/deploying-smart-contract/with-Foundry.md)
              - [...with Hardhat](./building-on-lisk/deploying-smart-contract/with-Hardhat.md)
              - [...with Remix](./building-on-lisk/deploying-smart-contract/with-Remix.mdx)
              - [...with thirdweb](./building-on-lisk/deploying-smart-contract/with-thirdweb.mdx)
              </td>
              <td>
              - [...with ethers.js](./building-on-lisk/interacting-with-the-blockchain/ethers.md)
              - [...with viem](./building-on-lisk/interacting-with-the-blockchain/viem.mdx)
              - [...with web3](./building-on-lisk/interacting-with-the-blockchain/web3.mdx)
              </td>
            </tr>
          </tbody>
        </table>
      </td>
      <td>
        <table>
          <thead>
            <tr>
              <th colspan="3">User Guides</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="3">
                <ul>
              <li><Link
                  to="/user/connecting-to-a-wallet/">
                  <Translate>Connecting to a wallet</Translate>
                </Link></li>
              <li><Link
                  to="/user/import-lsk-metamask/">
                  <Translate>Importing LSK to MetaMask</Translate>
                </Link></li>
              <li><Link
                  to="/user/exchanges/">
                  <Translate>Exchanges supporting LSK</Translate>
                </Link></li>
              <li><Link
                  to="/user/wallets/">
                  <Translate>Wallets</Translate>
                </Link></li>
              <li><Link
                  to="/user/claiming/">
                  <Translate>How to claim LSK</Translate>
                </Link></li>
              <li><Link
                  to="/user/bridges/">
                  <Translate>Bridges</Translate>
                </Link></li>
              </ul>
              </td>
            </tr>
            <tr>
              <th>Lisk Governance</th>
              <th>Staking Docs</th>
            </tr>
            <tr>
            <td>
              - [Overview](./docs-user/governance/overview.mdx)
              - [Delegation](./docs-user/governance/delegation.mdx)
              - [Proposal Lifecycle](./docs-user/governance/proposal-lifecycle.mdx)
              - [Voting](./docs-user/governance/voting.mdx)
              </td>
              <td>
              - [Overview](./docs-user/governance/overview.mdx)
              - [Delegation](./docs-user/governance/delegation.mdx)
              - [Proposal Lifecycle](./docs-user/governance/proposal-lifecycle.mdx)
              - [Voting](./docs-user/governance/voting.mdx)
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
  </table>


        </div>
      </main>
    </Layout>
  );
}
