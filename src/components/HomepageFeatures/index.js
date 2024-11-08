import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

const FeatureList = [
  {
    img: (
      <>
        <img src='/img/Lisk.svg' className='lisk-smp'></img>
      </>
    ),
    title: 'What is Lisk?',
    description: (
      <>
        <p>Lisk offers a highly efficient, lightning-fast, and easily scalable Layer 2 (L2) network built on Optimism (OP) and secured by Ethereum.</p>
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
    img: (
      <>
        <img src='/img/build.svg' className='lisk-smp'></img>
      </>
    ),
    title: 'Build with Lisk',
    description: (
      <>
        <p>Lisk offers low-cost transactions, EVM compatibility, and support for all major developer frameworks, making it the top choice for developers. Join Lisk to access essential technical materials for your development journey.</p>
        <Link
          className="button button--secondary button--lg btn-custom"
          to="/category/building-on-lisk">
          GET STARTED
        </Link>
      </>
    ),
  },
  {
    img: (
      <>
        <img src='/img/lisk-ecosystem.svg' className='lisk-smp'></img>
      </>
    ),
    title: 'Ecosystem for the future',
    description: (
      <>
        <p>Lisk embraces the superchain framework, offering decentralized <Link to="/category/governance">governance</Link> and an interoperable ecosystem. We provide <Link to="https://lisk.com/blog/posts/say-hello-to-the-new-Lisk-L2-grant-program">grant programs</Link> to support the development of products and advocate for the principles of a decentralized world and inclusivity.</p>
        <Link
          className="button button--secondary button--lg btn-custom"
          to="/governance/overview">
          LEARN MORE
        </Link>
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
      <div className="text--center text-style-custom padding-horiz--md">
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
