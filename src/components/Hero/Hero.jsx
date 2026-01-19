import { heroData } from '../../data/heroData';
import './Hero.css';

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

  return (
    <section className="hero">
      <div className="hero__background">
        <img src={backgroundImage} alt={backgroundAlt} className="hero__background-image" />
        <div className="hero__overlay"></div>
      </div>

      <div className="hero__content">
        <div className="hero__text">
          <h1 className="hero__title">
            {title}
            <span className="hero__title-large">{emphasis}</span>
          </h1>
          <p className="hero__subtitle">{subtitle}</p>
          <button 
            className="hero__button" 
            type="button"
            onClick={() => window.open('https://t.me/impera_design', '_blank')}
          >
            {ctaLabel}
          </button>
        </div>

        <div className="hero__features">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="hero__feature">
                <span className="hero__feature-icon" aria-hidden="true">
                  <Icon />
                </span>
                <div className="hero__feature-content">
                  <h3 className="hero__feature-title">{feature.title}</h3>
                  <p className="hero__feature-text">{feature.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Hero;

