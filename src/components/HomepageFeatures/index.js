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
        <Link to="/docs">Lisk</Link> offers a highly efficient, lightning-fast, and easily scalable Layer 2 (L2) network built on Optimism (OP) and secured by Ethereum.
      </>
    ),
  },
  {
    title: 'Build with Lisk',
    Svg: require('/img/build-dark.svg').default,
    description: (
      <>
        Lisk offers low-cost transactions, EVM compatibility, and support for all major developer frameworks, making it the top choice for developers. Join Lisk to access essential<Link to="/docs/category/building-on-lisk"> technical materials</Link> for your development journey.
      </>
    ),
  },
  {
    title: 'Ecosystem for the future',
    Svg: require('/img/lisk-ecosystem-dark.svg').default,
    description: (
      <>
        <p>Lisk embraces the superchain framework, offering decentralized <Link to="/user/category/governance">governance</Link> and an interoperable ecosystem. We provide <Link to="https://lisk.com/blog/posts/say-hello-to-the-new-Lisk-L2-grant-program">grant programs</Link> to support the development of products and advocate for the principles of a decentralized world and inclusivity.</p>
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
