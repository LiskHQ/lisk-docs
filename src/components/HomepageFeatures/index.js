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
          <p className='line-space-text'><Translate>Lisk offers a highly efficient, lightning-fast, and easily scalable Layer 2 (L2) network built on Optimism (OP) and secured by Ethereum.</Translate>
          </p>
          <Link
            className="button button--secondary button--lg btn-custom"
            to="/docs/">
            <Translate>Explore</Translate>
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
          <p className='line-space-text'><Translate>Lisk offers low-cost transactions, EVM compatibility, and support for all major developer frameworks, making it the top choice for developers. Join Lisk to access essential technical materials for your development journey.</Translate></p>
          <Link
            className="button button--secondary button--lg btn-custom"
            to="/category/building-on-lisk">
            <Translate>Get started</Translate>
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
    title: translate({ message: 'Ecosystem for the future' }),
    description: (
      <>
        <div>
          <p className='line-space-text'><Translate>Lisk embraces the superchain framework, offering decentralized </Translate> <Link to="/category/governance"> <Translate>governance</Translate></Link> <Translate>and an interoperable ecosystem. We provide </Translate> <Link to="https://lisk.com/founders/"> <Translate>opportunities</Translate></Link> <Translate>to support the development of products and advocate for the principles of a decentralized world and inclusivity.</Translate></p>
          <Link
            className="button button--secondary button--lg btn-custom"
            to="https://lisk.com/ecosystem/">
            <Translate>Learn more</Translate>
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
