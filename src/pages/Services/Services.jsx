import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion as Motion } from 'motion/react';
import { FaChevronDown } from 'react-icons/fa';
import { CiMail } from 'react-icons/ci';
import StickyHeader from '../../components/StickyHeader/StickyHeader';
import Footer from '../../components/Footer/Footer';
import Breadcrumbs from '../../components/Widgets/Breadcrumbs/Breadcrumbs';
import { servicesData } from '../../data/servicesData';
import { footerData } from '../../data/footerData';
import './Services.css';

const MotionArticle = Motion.article;

function Services() {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef({});

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown && dropdownRefs.current[openDropdown]) {
        if (!dropdownRefs.current[openDropdown].contains(event.target)) {
          setOpenDropdown(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  const toggleDropdown = (serviceId) => {
    setOpenDropdown(openDropdown === serviceId ? null : serviceId);
  };

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
              style={{ backgroundImage: `url(${service.background})` }}
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
                  <div 
                    className="service-item__dropdown-wrapper"
                    ref={(el) => dropdownRefs.current[service.id] = el}
                  >
                    <button 
                      onClick={() => toggleDropdown(service.id)}
                      className={`service-item__button service-item__button--ghost ${openDropdown === service.id ? 'active' : ''}`}
                    >
                      {servicesData.pageTexts.buttons.contact}
                      <FaChevronDown className="service-item__button-icon" />
                    </button>
                    {openDropdown === service.id && (
                      <div className="service-item__dropdown">
                        {footerData.socials.map((social) => {
                          const SocialIcon = social.icon;
                          return (
                            <a
                              key={social.label}
                              href={social.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="service-item__dropdown-item"
                            >
                              {social.iconType === 'img' ? (
                                <img src={SocialIcon} alt="" className="service-item__dropdown-icon service-item__dropdown-icon--img" />
                              ) : (
                                <SocialIcon className="service-item__dropdown-icon" />
                              )}
                              <span className="service-item__dropdown-text">{social.label}</span>
                            </a>
                          );
                        })}
                        <a 
                          href={`mailto:${servicesData.contactCard.contact.email}?subject=${encodeURIComponent(service.title)}`}
                          className="service-item__dropdown-item"
                        >
                          <CiMail className="service-item__dropdown-icon" />
                          <span className="service-item__dropdown-text">Email</span>
                        </a>
                      </div>
                    )}
                  </div>
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

