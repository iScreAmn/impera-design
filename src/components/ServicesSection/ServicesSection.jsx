import React from 'react';
import { Link } from 'react-router-dom';
import { background1, background2, background3, background4, background5 } from '../../assets/images';
import './ServicesSection.css';

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: 'Полный дизайн проект',
      text: 'Создаём стильные и функциональные интерьеры под ваши задачи',
      background: background2,
      className: 'service-card--large'
    },
    {
      id: 2,
      title: '3D-Визуализация',
      text: 'Фотореалистичные визуализации интерьеров для наглядного представления проекта',
      background: background1,
      className: ''
    },
    {
      id: 3,
      title: 'Рабочие чертежи',
      text: 'Детальные чертежи для реализации проекта с точными размерами и спецификациями',
      background: background4,
      className: ''
    },
    {
      id: 4,
      title: 'Ремонт под ключ',
      text: 'Полный цикл ремонтных работ от проекта до сдачи',
      background: background5,
      className: 'service-card--wide'
    },
    {
      id: 5,
      title: 'Авторский надзор',
      text: 'Контроль качества и соответствия работ дизайн-проекту',
      background: background3,
      className: ''
    }
  ];

  return (
    <section className="services-section">
      <div className="services__wrapper">
        {services.map((service) => (
          <Link
            key={service.id}
            to={`/services#service-${service.id}`}
            className={`service-card ${service.className}`}
            style={{ backgroundImage: `url(${service.background})` }}
            aria-label={`Перейти к услуге ${service.title}`}
          >
            <div className="service-card__overlay">
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__text">{service.text}</p>
            </div>
          </Link>
        ))}

        <div className="service-card service-card--dark">
          <div className="service-card__overlay">
            <p className="service-card__question">Не знаете, что именно вам нужно?</p>
            <h3 className="service-card__title">Давайте обсудим задачу и расскажем, как мы можем вам помочь</h3>
            <div className="service-card__contact">
              <p className="service-card__contact-label">Спрашивайте, ответчаем онлайн</p>
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