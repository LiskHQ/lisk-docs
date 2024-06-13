import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

const FeatureList = [
  {
    title: 'What is Lisk?',
    Svg: require('/img/lisk-light.svg').default,
    // Svg: require('/img/lisk-icon-dark-footer.svg').default,
    description: (
      <>
        <p><Link to="/docs">Lisk</Link> offers a highly efficient, lightning-fast, and easily scalable Layer 2 (L2) network built on Optimism (OP) and secured by Ethereum.</p>
        <br></br>
        <br></br>
        <Link
          className="button button--secondary button--lg btn-custom"
          to="/docs/">
          EXPLORE
        </Link>
      </>
    ),
  },
  {
    title: 'Build with Lisk',
    Svg: require('/img/build-dark.svg').default,
    Svg: require('/img/build-light.svg').default,
    description: (
      <>
        <p>Lisk offers low-cost transactions, EVM compatibility, and support for all major developer frameworks, making it the top choice for developers. Join Lisk to access essential<Link to="/docs/category/building-on-lisk"> technical materials</Link> for your development journey.</p>
        <Link
          className="button button--secondary button--lg btn-custom"
          to="/docs/">
          GET STARTED
        </Link>
      </>
    ),
  },
  {
    title: 'Ecosystem for the future',
    Svg: require('/img/lisk-ecosystem-light.svg').default,
    description: (
      <>
        <p>Lisk embraces the superchain framework, offering decentralized <Link to="/user/category/governance">governance</Link> and an interoperable ecosystem. We provide <Link to="https://lisk.com/blog/posts/say-hello-to-the-new-Lisk-L2-grant-program">grant programs</Link> to support the development of products and advocate for the principles of a decentralized world and inclusivity.</p>
        <Link
          className="button button--secondary button--lg btn-custom"
          to="/docs/">
          LEARN MORE
        </Link>
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg id='lisk-logo' className={styles.featureSvg} role="img" />
        {/* <Svg className={styles.featureSvg} role="img" /> */}
      </div>
      <div className="text--center text-style-custom padding-horiz--md">
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
