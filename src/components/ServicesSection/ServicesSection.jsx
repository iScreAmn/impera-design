import React from 'react';
import { Link } from 'react-router-dom';
import { servicesData } from '../../data/servicesData';
import './ServicesSection.css';

const ServicesSection = () => {
  return (
    <section className="services-section">
      <div className="services-section__container">
        <h2 className="services-section__title">{servicesData.title}</h2>
        <div className="services__wrapper">
          {servicesData.services.map((service) => (
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
              <p className="service-card__question">{servicesData.contactCard.question}</p>
              <h3 className="service-card__title">{servicesData.contactCard.title}</h3>
              <div className="service-card__contact">
                <p className="service-card__contact-label">{servicesData.contactCard.contact.label}</p>
                <a href={`mailto:${servicesData.contactCard.contact.email}`} className="service-card__email">
                  {servicesData.contactCard.contact.email}
                </a>
                <p className="service-card__contact-label">{servicesData.contactCard.contact.phoneLabel}</p>
                <a href={`tel:${servicesData.contactCard.contact.phone.replace(/\s/g, '')}`} className="service-card__phone">
                  {servicesData.contactCard.contact.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;