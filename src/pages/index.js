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
      </main>
    </Layout>
  );
}
