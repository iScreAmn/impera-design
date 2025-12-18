import { useEffect, useRef, useState } from 'react';
import StickyHeader from '../../components/StickyHeader/StickyHeader';
import Breadcrumbs from '../../components/Widgets/Breadcrumbs/Breadcrumbs';
import Modal from '../../components/widgets/Modals/Modal';
import Footer from '../../components/Footer/Footer';
import useModal from '../../utils/useModal';
import { contactsData, socialLinks, infoCards, texts } from '../../data/contactsData';
import './Contacts.css';

function YandexMap() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const { address, phone } = contactsData;

  useEffect(() => {
    const existingScript = document.querySelector('script[src*="api-maps.yandex.ru"]');
    
    const initMap = () => {
      if (mapInstanceRef.current) return;
      
      window.ymaps.ready(() => {
        if (mapInstanceRef.current) return;
        
        mapInstanceRef.current = new window.ymaps.Map(mapRef.current, {
          center: address.coordinates,
          zoom: 15,
          controls: ['zoomControl', 'fullscreenControl'],
          behaviors: ['drag', 'dblClickZoom', 'multiTouch'],
          type: 'yandex#map',
        });

        mapInstanceRef.current.behaviors.disable('scrollZoom');
        
        mapInstanceRef.current.controls.get('zoomControl').options.set({
          size: 'small',
          position: { right: 10, top: 50 }
        });

        const placemark = new window.ymaps.Placemark(
          address.coordinates,
          {
            balloonContent: address.full,
          },
          {
            iconLayout: 'default#image',
            iconImageHref: '/location.png',
            iconImageSize: [48, 54],
            iconImageOffset: [-24, -54],
          }
        );

        mapInstanceRef.current.geoObjects.add(placemark);
      });
    };

    if (existingScript) {
      if (window.ymaps) {
        initMap();
      } else {
        existingScript.addEventListener('load', initMap);
      }
    } else {
      const script = document.createElement('script');
      script.src = `https://api-maps.yandex.ru/2.1/?apikey=${import.meta.env.VITE_YANDEX_MAPS_API_KEY}&lang=ru_RU`;
      script.async = true;
      script.onload = initMap;
      document.body.appendChild(script);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
    };
  }, [address.coordinates, address.full]);

  const handleBuildRoute = () => {
    const encodedAddress = encodeURIComponent(address.full);
    window.open(`https://yandex.ru/maps/?rtext=~${encodedAddress}`, '_blank');
  };

  return (
    <div className="contacts__map-wrapper">
      <div ref={mapRef} className="contacts__map" />
      <div className="contacts__map-overlay">
        <h2 className="contacts__map-title">{texts.addressTitle}</h2>
        <div className="contacts__map-info">
          <p className="contacts__map-address">
            {address.city}<br />
            {address.street}
          </p>
          <a href={phone.link} className="contacts__map-phone">
            {phone.value}
          </a>
        </div>
        <div className="contacts__map-socials">
          <p className="contacts__map-socials-label">{texts.socialsLabel}</p>
          <div className="contacts__map-socials-icons">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a 
                  key={social.id}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contacts__social-icon" 
                  aria-label={social.name}
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>
        <button className="contacts__route-btn" onClick={handleBuildRoute}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>
          </svg>
          {texts.buildRouteBtn}
        </button>
      </div>
    </div>
  );
}

function Contacts() {
  const { isOpen, openModal, closeModal } = useModal();
  const { phone } = contactsData;
  const [formData, setFormData] = useState({ name: '', phone: '' });

  const isFormValid = formData.name.trim() && formData.phone.trim();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Отправка формы
    setFormData({ name: '', phone: '' });
    closeModal();
  };

  return (
    <div className="contacts">
      <StickyHeader />
      
      <div className="contacts__breadcrumbs">
        <div className="contacts__breadcrumbs-container">
          <Breadcrumbs />
        </div>
      </div>

      <section className="contacts__hero">
        <div className="contacts__container">
          <h1 className="contacts__title">{texts.pageTitle}</h1>
          
          <div className="contacts__info-grid">
            {infoCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.id} className="contacts__info-card">
                  <div className="contacts__info-icon">
                    <Icon />
                  </div>
                  <div className="contacts__info-content">
                    {card.isLink ? (
                      <a href={card.link} className="contacts__info-value">
                        {card.value}
                      </a>
                    ) : (
                      <p className="contacts__info-value">{card.value}</p>
                    )}
                    <p className="contacts__info-label">{card.label}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <button 
            className="contacts__cta-btn"
            onClick={openModal}
          >
            {texts.ctaBtn}
          </button>
        </div>
      </section>

      <section className="contacts__map-section">
        <YandexMap />
      </section>

      <Modal 
        isOpen={isOpen} 
        onClose={closeModal}
        title={texts.modal.title}
        className="callback-modal"
      >
        <form className="callback-modal__form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={texts.modal.namePlaceholder}
            className="callback-modal__input"
          />
          <input 
            type="tel" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={texts.modal.phonePlaceholder}
            className="callback-modal__input"
          />
          <textarea 
            placeholder="Сообщение (необязательно)"
            className="callback-modal__textarea"
            rows="3"
          />
          <button 
            type="submit" 
            className="callback-modal__submit"
            disabled={!isFormValid}
          >
            {texts.modal.submitBtn}
          </button>
        </form>

        <div className="callback-modal__phone-section">
          <p className="callback-modal__phone-label">Или позвоните нам:</p>
          <a href={phone.link} className="callback-modal__phone-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path 
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            {phone.value}
          </a>
        </div>
      </Modal>

      <Footer />
    </div>
  );
}

export default Contacts;
