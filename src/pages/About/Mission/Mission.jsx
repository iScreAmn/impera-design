import React, { useEffect, useRef } from 'react';
import { animate, inView } from 'motion';
import { background6 } from '../../../assets/images';
import './Mission.css';

const Mission = () => {
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
          <p className="mission__eyebrow">Миссия компании</p>
          <h2 className="mission__title">
            Помогать бизнесу раскрывать свою индивидуальность через пространство
          </h2>
          <p className="mission__subtitle">
            Мы превращаем идеи владельцев в интерьер, который работает как инструмент: привлекает,
            удерживает, укрепляет доверие и повышает ценность вашего продукта или услуги.
          </p>
        </div>

        <div ref={containerRef} className="mission__grid">
          <div
            ref={(el) => (cardsRef.current[0] = el)}
            className="mission__card"
            style={{ opacity: 0, transform: 'translateY(30px)' }}
          >
            <h3 className="mission__card-title">Индивидуальность как актив</h3>
            <p className="mission__card-text">
              Каждое пространство — уникальный код бренда: выделяем ДНК компании и транслируем его
              через форму, материалы, свет и сценарии движения.
            </p>
          </div>

          <div
            ref={(el) => (cardsRef.current[1] = el)}
            className="mission__card mission__card--accent"
            style={{ opacity: 0, transform: 'translateY(30px)' }}
          >
            <h3 className="mission__card-title">Интерьер как инструмент</h3>
            <p className="mission__card-text">
              Проектируем так, чтобы интерьер работал: повышал доверие клиентов, упрощал маршруты,
              удерживал внимание и поддерживал продажи.
            </p>
          </div>

          <div
            ref={(el) => (cardsRef.current[2] = el)}
            className="mission__card"
            style={{ opacity: 0, transform: 'translateY(30px)' }}
          >
            <h3 className="mission__card-title">Системный подход</h3>
            <p className="mission__card-text">
              От стратегии до реализации: концепция, 3D, чертежи, подбор материалов и авторский
              надзор — контролируем качество на каждом этапе.
            </p>
          </div>

          <div
            ref={(el) => (cardsRef.current[3] = el)}
            className="mission__card"
            style={{ opacity: 0, transform: 'translateY(30px)' }}
          >
            <h3 className="mission__card-title">Устойчивый результат</h3>
            <p className="mission__card-text">
              Дизайн, который долго остаётся актуальным: продумываем эксплуатацию, сервис и
              возможность обновлять пространство без сложных вмешательств.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;

