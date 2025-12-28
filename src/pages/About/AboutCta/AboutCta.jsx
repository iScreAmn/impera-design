import React, { useEffect, useRef } from 'react';
import { animate, inView } from 'motion';
import { photo5 } from '../../../assets/images';
import './AboutCta.css';

const AboutCta = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const stop = inView(
      sectionRef.current,
      () => {
        animate(
          titleRef.current,
          { opacity: [0, 1], y: [40, 0] },
          {
            duration: 0.9,
            easing: [0.22, 1, 0.36, 1]
          }
        );
      },
      { amount: 0.3 }
    );

    return () => stop();
  }, []);

  useEffect(() => {
    if (!textRef.current) return;

    const stop = inView(
      sectionRef.current,
      () => {
        animate(
          textRef.current,
          { opacity: [0, 1], y: [30, 0] },
          {
            duration: 0.8,
            delay: 0.2,
            easing: [0.22, 1, 0.36, 1]
          }
        );
      },
      { amount: 0.3 }
    );

    return () => stop();
  }, []);

  useEffect(() => {
    if (!buttonsRef.current) return;

    const stop = inView(
      sectionRef.current,
      () => {
        animate(
          buttonsRef.current,
          { opacity: [0, 1], y: [25, 0] },
          {
            duration: 0.7,
            delay: 0.4,
            easing: [0.22, 1, 0.36, 1]
          }
        );
      },
      { amount: 0.3 }
    );

    return () => stop();
  }, []);

  return (
    <section ref={sectionRef} className="about-cta">
      <div className="about-cta__bg">
        <img src={photo5} alt="Impera Design" className="about-cta__image" />
      </div>
      <div className="about-cta__overlay" />
      
      <div className="about-cta__container about-section">
        <div className="about-cta__content">
          <h2
            ref={titleRef}
            className="about-cta__title"
            style={{ opacity: 0, transform: 'translateY(40px)' }}
          >
            Готовы к новому уровню дизайна?
          </h2>
          <p
            ref={textRef}
            className="about-cta__text"
            style={{ opacity: 0, transform: 'translateY(30px)' }}
          >
            Свяжитесь с нами и мы начнем работу <br /> над вашим проектом уже сегодня
          </p>
          <div
            ref={buttonsRef}
            className="about-cta__buttons"
            style={{ opacity: 0, transform: 'translateY(25px)' }}
          >
            <a href="#contact" className="about-cta__button about-cta__button--primary">
              Обсудить проект
            </a>
            <a href="#portfolio" className="about-cta__button about-cta__button--secondary">
              Наши работы
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCta;

