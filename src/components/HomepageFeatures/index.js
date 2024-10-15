import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';

const FeatureList = [
  {
    img: (
      <>
        <img src='/img/lisk-light.svg' className='lisk-smp-light'></img>
        <img src='/img/lisk-dark.svg' className='lisk-smp-dark'></img>
      </>
    ),
    title: translate({message:'What is Lisk?'}),
    description: (
      <>
        <p><Translate>Lisk offers a highly efficient, lightning-fast, and easily scalable Layer 2 (L2) network built on Optimism (OP) and secured by Ethereum.</Translate></p>
        <br></br>
        <br></br>
        <Link
          className="button button--secondary button--lg btn-custom"
          to="/docs/">
          <Translate>EXPLORE</Translate>
        </Link>
      </>
    ),
  },
  {
    img: (
      <>
        <img src='/img/build-light.svg' className='lisk-smp-light'></img>
        <img src='/img/build-dark.svg' className='lisk-smp-dark'></img>
      </>
    ),
    title: translate({message:"Build with Lisk"}),
    description: (
      <>
        <p><Translate>Lisk offers low-cost transactions, EVM compatibility, and support for all major developer frameworks, making it the top choice for developers. Join Lisk to access essential technical materials for your development journey.</Translate></p>
        <Link
          className="button button--secondary button--lg btn-custom"
          to="/category/building-on-lisk">
          <Translate>GET STARTED</Translate>
        </Link>
      </>
    ),
  },
  {
    img: (
      <>
        <img src='/img/lisk-ecosystem-light.svg' className='lisk-smp-light'></img>
        <img src='/img/lisk-ecosystem-dark.svg' className='lisk-smp-dark'></img>
      </>
    ),
    title: translate({message:'Ecosystem for the future'}),
    description: (
      <>
        <p><Translate>Lisk embraces the superchain framework, offering decentralized governance and an interoperable ecosystem. We provide </Translate><Link to="https://lisk.com/blog/posts/say-hello-to-the-new-Lisk-L2-grant-program"><Translate description="ecosystem-lisk.description-link">grant programs</Translate></Link> <Translate>to support the development of products and advocate for the principles of a decentralized world and inclusivity.</Translate></p>
        <Link
          className="button button--secondary button--lg btn-custom"
          to="/governance/overview">
          <Translate>LEARN MORE</Translate>
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
