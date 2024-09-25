import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Welcome to the Lisk Documentation 🎉
        </Heading>
        <p className="hero__subtitle">Explore our comprehensive knowledge base tailored for both developers and users! Find in-depth technical information and helpful guides all about the Lisk blockchain.</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/category/building-on-lisk">
            Let's build with Lisk  🛠
          </Link>
        </div>
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
