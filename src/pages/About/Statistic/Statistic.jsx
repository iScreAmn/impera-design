import React, { useEffect, useRef, useState } from 'react';
import { animate, inView } from 'motion';
import { statisticData } from '../../../data/statisticData';
import './Statistic.css';

const AnimatedCounter = ({ value, prefix = '', suffix = '', suffixSmall }) => {
  const [current, setCurrent] = useState(0);
  const nodeRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!nodeRef.current) return;

    const stop = inView(
      nodeRef.current,
      () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const controls = animate(0, value, {
          duration: 1.6,
          onUpdate: (v) => setCurrent(Math.round(v))
        });

        return () => controls.stop();
      },
      { amount: 0.6 }
    );

    return () => stop();
  }, [value]);

  return (
    <div ref={nodeRef} className="statistic__value">
      {prefix}
      {current}
      {suffix && (suffixSmall ? <span className="statistic__value-unit">{suffix}</span> : suffix)}
    </div>
  );
};

const Statistic = () => {
  const { title, subtitle, description, stats } = statisticData;
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;
    if (window.innerWidth <= 767) return;

    const stop = inView(
      containerRef.current,
      () => {
        cardsRef.current.forEach((card, index) => {
          if (!card) return;

          animate(
            card,
            { opacity: [0, 1], y: [20, 0] },
            {
              duration: 0.6,
              delay: index * 0.12,
              easing: 'ease-out'
            }
          );
        });
      },
      { amount: 0.35 }
    );

    return () => stop();
  }, []);

  return (
    <section className="statistic">
      <div className="statistic__container about-section">
        <div className="statistic__header">
          <h2 className="statistic__title">
            {title} <span className="statistic__title-accent">{subtitle}</span>
          </h2>
          <p className="statistic__description">{description}</p>
        </div>

        <div ref={containerRef} className="statistic__grid">
          {stats.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="statistic__card"
              style={{ opacity: 0, transform: 'translateY(20px)' }}
            >
              <AnimatedCounter
                value={item.value}
                prefix={item.prefix}
                suffix={item.suffix}
                suffixSmall={item.suffixSmall}
              />
              <p className="statistic__label">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistic;

