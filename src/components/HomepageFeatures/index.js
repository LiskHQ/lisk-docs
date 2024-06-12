import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

const FeatureList = [
  {
    title: 'What is Lisk?',
    Svg: require('/img/lisk-icon-light-footer.svg').default,
    description: (
      <>
        Lisk offers a highly efficient, lightning-fast, and easily scalable Layer 2 (L2) network built on Optimism (OP) and secured by Ethereum.
      </>
    ),
  },
  {
    title: 'Build with Lisk',
    Svg: require('/img/build-dark.svg').default,
    description: (
      <>
        Lisk offers low-cost transactions, EVM compatibility, and support for all major developer frameworks, making it the top choice for developers. Join Lisk to access essential technical materials for your development journey.
      </>
    ),
  },
  {
    title: 'Ecosystem for the future',
    Svg: require('/img/lisk-ecosystem-dark.svg').default,
    description: (
      <>
        <p>Embracing the superchain framework, Lisk presents an
          decentralized <Link to="/user/category/governance">governance</Link> interoperable ecosystem, reinforcing
          and offering <Link to="https://lisk.com/blog/posts/say-hello-to-the-new-Lisk-L2-grant-program">grant programs</Link> to advocate the principles of a decentralized world and inclusivity.</p>
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
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
