import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { heroData } from '../../data/heroData';
import './Hero.css';

const itemFromLeft = {
  hidden: { opacity: 0, x: -28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

function Hero() {
  const {
    backgroundImage,
    backgroundAlt,
    title,
    emphasis,
    subtitle,
    ctaLabel,
    features,
  } = heroData;

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const featureText = (text) => (isMobile ? text : text.replace(/\n/g, ' '));

  return (
    <section className="hero">
      <div className="hero__background">
        <img src={backgroundImage} alt={backgroundAlt} className="hero__background-image" />
        <div className="hero__overlay"></div>
      </div>

      <motion.div
        className="hero__content"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
        }}
      >
        <motion.div
          className="hero__text"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0 } },
          }}
        >
          <motion.h1 className="hero__title" variants={itemFromLeft}>{title}</motion.h1>
          <motion.span className="hero__title-large" variants={itemFromLeft}>{emphasis}</motion.span>
          <motion.p className="hero__subtitle" variants={itemFromLeft}>{subtitle}</motion.p>
          <motion.button
            className="hero__button"
            type="button"
            variants={itemFromLeft}
            onClick={() => window.open('https://t.me/impera_design', '_blank')}
          >
            {ctaLabel}
          </motion.button>
        </motion.div>

        <motion.div
          className="hero__features"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0 } },
          }}
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div key={feature.title} className="hero__feature" variants={item}>
                <span className="hero__feature-icon" aria-hidden="true">
                  <Icon />
                </span>
                <div className="hero__feature-content">
                  <h3 className="hero__feature-title">{feature.title}</h3>
                  <p className={`hero__feature-text${isMobile ? ' hero__feature-text--pre-line' : ''}`}>{featureText(feature.text)}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;

