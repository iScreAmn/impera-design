import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion as Motion } from 'motion/react';
import StickyHeader from '../../components/StickyHeader/StickyHeader';
import Footer from '../../components/Footer/Footer';
import Breadcrumbs from '../../components/Widgets/Breadcrumbs/Breadcrumbs';
import { servicesData } from '../../data/servicesData';
import './Services.css';

const MotionArticle = Motion.article;

function Services() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      // Дожидаемся полного рендеринга страницы
      const timer = setTimeout(() => {
        const target = document.querySelector(location.hash);
        if (target) {
          const stickyHeader = document.querySelector('.sticky-header');
          const headerHeight = stickyHeader ? stickyHeader.offsetHeight : 140;
          
          // Вычисляем позицию с учетом высоты header + небольшой отступ
          const elementTop = target.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementTop - headerHeight - 50; // +20px для дополнительного отступа

          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: 'smooth'
          });
        }
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <div className="services">
      <StickyHeader />

      <div className="services-breadcrumbs">
        <div className="services-breadcrumbs__container">
          <Breadcrumbs />
        </div>
      </div>

      <section className="services__hero">
        <div className="services__hero-overlay" />
      </section>

      <section className="services__wrapper" aria-label={servicesData.pageTexts.ariaLabel}>
        {servicesData.pageServices.map((service, index) => (
          <MotionArticle
            key={service.id}
            id={service.id}
            className="service-item"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.65, ease: 'easeOut', delay: index * 0.05 }}
          >
            <div
              className="service-item__image"
              style={{ backgroundImage: `linear-gradient(160deg, rgba(10,10,10,0.75), rgba(10,10,10,0.35)), url(${service.background})` }}
              role="presentation"
            >
              <div className="service-item__badge">{service.badge}</div>
            </div>

            <div className="service-item__content">
              <p className="service-item__eyebrow">{servicesData.pageTexts.eyebrowPrefix} {index + 1}</p>
              <h2 className="service-item__title">{service.title}</h2>
              <p className="service-item__description">{service.summary}</p>
              <div className="service-item__list-wrap">
                <p className="service-item__list-title">{servicesData.pageTexts.listTitle}</p>
                <ul className="service-item__list">
                  {service.deliverables.map((item) => (
                    <li key={item} className="service-item__list-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="service-item__footer">
                <span className="service-item__price">{service.price}</span>
                <div className="service-item__actions">
                  <a href="https://t.me/olga_korshow" target="_blank" rel="noreferrer" className="service-item__button service-item__button--primary">
                    {servicesData.pageTexts.buttons.discuss}
                  </a>
                  <a href={`mailto:${servicesData.contactCard.contact.email}?subject=${encodeURIComponent(service.title)}`} className="service-item__button service-item__button--ghost">
                    {servicesData.pageTexts.buttons.email}
                  </a>
                </div>
              </div>
            </div>
          </MotionArticle>
        ))}
      </section>

      <Footer />
    </div>
  );
}

export default Services;

