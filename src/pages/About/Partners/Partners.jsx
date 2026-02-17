import React, { useEffect, useRef } from 'react';
import { animate, inView } from 'motion';
import { 
  partner8,
  partner1, 
  partner2, 
  partner3, 
  partner4, 
  partner5, 
  partner6, 
  partner7 
} from '../../../assets/images/index';
import './Partners.css';

const Partners = () => {
  const headerRef = useRef(null);
  const trackRef = useRef(null);
  const partners = [
    { id: 8, logo: partner8, name: 'Partner 8', link: 'https://lafee-remont.ru/' },
    { id: 1, logo: partner1, name: 'Древ Уют', link: '#!' },
    { id: 2, logo: partner2, name: 'Eco Carcas', link: '#!' },
    { id: 3, logo: partner3, name: 'ИССтрой', link: '#!' },
    { id: 4, logo: partner4, name: 'Кухни', link: '#!' },
    { id: 5, logo: partner5, name: 'Lightproof', link: '#!' },
    { id: 6, logo: partner6, name: 'Строим', link: '#!' },
    { id: 7, logo: partner7, name: 'Location', link: '#!' },
  ];

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
    if (!trackRef.current) return;

    const stop = inView(
      trackRef.current,
      () => {
        animate(
          trackRef.current,
          { y: [40, 0] },
          {
            duration: 1,
            delay: 0.3,
            easing: 'ease-out'
          }
        );
      },
      { amount: 0.2 }
    );

    return () => stop();
  }, []);

  return (
    <section className="partners">
      <div className="partners__content about-section">
        <div 
          ref={headerRef} 
          className="partners__header"
          style={{ opacity: 0, transform: 'translateY(30px)' }}
        >
          <p className="partners__eyebrow">Партнёры</p>
          <h2 className="partners__title">Надежные партнеры - гарантия качества</h2>
          <p className="partners__subtitle">
            Работаем с проверенными поставщиками и подрядчиками, которые разделяют наше стремление к совершенству
          </p>
        </div>

        <div className="partners__wrapper">
          <div 
            ref={trackRef} 
            className="partners__track"
            style={{ transform: 'translateY(40px)' }}
          >
            {partners.map((partner) => (
              <a
                key={partner.id}
                href={partner.link}
                className="partners__item"
                aria-label={partner.name}
                {...(partner.link.startsWith('http') && {
                  target: '_blank',
                  rel: 'noopener noreferrer',
                })}
              >
                <div className="partners__card">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="partners__logo"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;