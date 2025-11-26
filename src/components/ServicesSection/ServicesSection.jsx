import React from 'react';
import { background1, background2, background4, background5, logo } from '../../assets/images';
import './ServicesSection.css';

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: 'Дизайн интерьера',
      text: 'Создаём стильные и функциональные интерьеры под ваши задачи',
      background: background2,
      className: 'service-card--large'
    },
    {
      id: 2,
      title: 'Ремонт под ключ',
      text: 'Полный цикл ремонтных работ от проекта до сдачи',
      background: background1,
      className: ''
    },
    {
      id: 3,
      title: 'Инвестиционный ремонт',
      text: 'Ремонт под сдачу и продажу с максимальной выгодой',
      background: background4,
      className: ''
    },
    {
      id: 4,
      title: 'Мебелировка квартир и домов',
      text: 'Подбор и расстановка мебели для готовых интерьеров',
      background: background5,
      className: 'service-card--wide'
    }
  ];

  return (
    <section className="services-section">
        <div className="services__wrapper">
          {services.map((service) => (
            <div
              key={service.id}
              className={`service-card ${service.className}`}
              style={{ backgroundImage: `url(${service.background})` }}
            >
              <div className="service-card__overlay">
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__text">{service.text}</p>
              </div>
            </div>
          ))}
          
          <div className="service-card service-card--dark">
            <img src={logo} alt="Impera Design" className="service-card__logo" />
            <div className="service-card__overlay">
              <p className="service-card__question">Не знаете, что именно вам нужно?</p>
              <h3 className="service-card__title">Давайте обсудим задачу и расскажем, как мы можем вам помочь</h3>
              <div className="service-card__contact">
                <p className="service-card__contact-label">Спрашивайте, ответчем онлайн</p>
                <a href="mailto:studio-lafee@yandex.ru" className="service-card__email">
                studio-lafee@yandex.ru
                </a>
                <p className="service-card__contact-label">или позвоните</p>
                <a href="tel:+79917761559" className="service-card__phone">
                  +7 (991) 776-15-59
                </a>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
};

export default ServicesSection;