import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';

const FeatureList = [
  {
    img: (
      <>
        <img src='/img/Lisk.svg' className='lisk-smp'></img>
      </>
    ),
    title: translate({ message: 'What is Lisk?' }),
    description: (
      <>
        <div>
          <p className='line-space-text'>Lisk offers a highly efficient, lightning-fast, and easily scalable Layer 2 (L2) network built on Optimism (OP) and secured by Ethereum.
          </p>
          <Link
            className="button button--secondary button--lg btn-custom"
            to="/docs/">
            Explore
          </Link>
        </div>
      </>
    ),
  },
  {
    img: (
      <>
        <img src='/img/build.svg' className='lisk-smp'></img>
      </>
    ),
    title: translate({ message: "Build with Lisk" }),
    description: (
      <>
        <div>
          <p className='line-space-text'>Lisk offers low-cost transactions, EVM compatibility, and support for all major developer frameworks, making it the top choice for developers. Join Lisk to access essential technical materials for your development journey.</p>
          <Link
            className="button button--secondary button--lg btn-custom"
            to="/category/building-on-lisk">
            Get started
          </Link>
        </div>
      </>
    ),
  },
  {
    img: (
      <>
        <img src='/img/lisk-ecosystem.svg' className='lisk-smp'></img>
      </>
    ),
    title: translate({ message: 'Tools for the Lisk ecosystem' }),
    description: (
      <>
        <div>
          <p className='line-space-text'>The Lisk chain comes with a broad ecosystem of tools and providers that makes using Lisk extremely convenient for users and devs alike.
            Lisk supports <Link to="https://lisk.com/chain/"> founders and builders</Link> with opportunities to develop the next generation of web3 applications.</p>
          <Link
            className="button button--secondary button--lg btn-custom"
            to="/category/lisk-tools">
            Discover
          </Link>
        </div>
      </>
    ),
  },
];

function Feature({ img, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <p>{img}</p>
      </div>
      <div className="text--center homepage-text-style-custom padding-horiz--md">
        <Heading as="h5">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
