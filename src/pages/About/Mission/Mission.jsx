import React, { useEffect, useRef } from 'react';
import { animate, inView } from 'motion';
import { background6 } from '../../../assets/images';
import { aboutData } from '../../../data/aboutData';
import './Mission.css';

const Mission = () => {
  const { eyebrow, title, subtitle, cards } = aboutData.mission;
  const headerRef = useRef(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (!headerRef.current) return;

    const stop = inView(
      headerRef.current,
      () => {
        animate(
          headerRef.current,
          { opacity: [0, 1], y: [30, 0] },
          {
            duration: 0.8,
            easing: 'ease-out'
          }
        );
      },
      { amount: 0.3 }
    );

    return () => stop();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const stop = inView(
      containerRef.current,
      () => {
        cardsRef.current.forEach((card, index) => {
          if (!card) return;

          animate(
            card,
            { opacity: [0, 1], y: [30, 0] },
            {
              duration: 0.6,
              delay: index * 0.1,
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
    <section className="mission">
      <div className="mission__bg" style={{ backgroundImage: `url(${background6})` }} />

      <div className="mission__content about-section">
        <div ref={headerRef} className="mission__header" style={{ opacity: 0, transform: 'translateY(30px)' }}>
          <p className="mission__eyebrow">{eyebrow}</p>
          <h2 className="mission__title">{title}</h2>
          <p className="mission__subtitle">{subtitle}</p>
        </div>

        <div ref={containerRef} className="mission__grid">
          {cards.map((card, index) => (
            <div
              key={card.title}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`mission__card${card.accent ? ' mission__card--accent' : ''}`}
              style={{ opacity: 0, transform: 'translateY(30px)' }}
            >
              <h3 className="mission__card-title">{card.title}</h3>
              <p className="mission__card-text">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;

