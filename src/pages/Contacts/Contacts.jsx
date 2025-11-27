import { useEffect, useRef, useState } from 'react';
import StickyHeader from '../../components/StickyHeader/StickyHeader';
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="contacts">
      <StickyHeader />
      
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
            onClick={() => setIsModalOpen(true)}
          >
            {texts.ctaBtn}
          </button>
        </div>
      </section>

      <section className="contacts__map-section">
        <YandexMap />
      </section>

      {isModalOpen && (
        <div className="contacts__modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="contacts__modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="contacts__modal-close" 
              onClick={() => setIsModalOpen(false)}
              aria-label="Закрыть"
            >
              ×
            </button>
            <h2 className="contacts__modal-title">{texts.modal.title}</h2>
            <form className="contacts__modal-form" onSubmit={(e) => {
              e.preventDefault();
              setIsModalOpen(false);
            }}>
              <input 
                type="text" 
                placeholder={texts.modal.namePlaceholder}
                className="contacts__modal-input"
                required
              />
              <input 
                type="tel" 
                placeholder={texts.modal.phonePlaceholder}
                className="contacts__modal-input"
                required
              />
              <button type="submit" className="contacts__modal-submit">
                {texts.modal.submitBtn}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contacts;
