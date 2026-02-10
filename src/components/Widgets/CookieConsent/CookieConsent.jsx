import { useState, useEffect } from 'react';
import { MdOutlineCookie } from 'react-icons/md';
import './CookieConsent.css';

function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-consent">
      <div className="cookie-consent__container">
        <div className="cookie-consent__icon">
          <MdOutlineCookie />
        </div>
        <p className="cookie-consent__text">
          Этот сайт использует файлы cookie для хранения данных. Продолжая использовать сайт, вы даете свое согласие на работу с этими файлами.
        </p>
        <button 
          className="cookie-consent__button"
          onClick={handleAccept}
          type="button"
        >
          Принять
        </button>
      </div>
    </div>
  );
}

export default CookieConsent;
