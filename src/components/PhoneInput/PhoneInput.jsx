import { useState, useRef, useEffect } from 'react';
import './PhoneInput.css';

const countries = [
  { code: 'AZ', name: 'Азербайджан', dial: '+994', flag: '🇦🇿' },
  { code: 'AM', name: 'Армения', dial: '+374', flag: '🇦🇲' },
  { code: 'BY', name: 'Беларусь', dial: '+375', flag: '🇧🇾' },
  { code: 'GB', name: 'Великобритания', dial: '+44', flag: '🇬🇧' },
  { code: 'DE', name: 'Германия', dial: '+49', flag: '🇩🇪' },
  { code: 'GE', name: 'Грузия', dial: '+995', flag: '🇬🇪' },
  { code: 'ES', name: 'Испания', dial: '+34', flag: '🇪🇸' },
  { code: 'IT', name: 'Италия', dial: '+39', flag: '🇮🇹' },
  { code: 'KZ', name: 'Казахстан', dial: '+7', flag: '🇰🇿' },
  { code: 'KG', name: 'Кыргызстан', dial: '+996', flag: '🇰🇬' },
  { code: 'MD', name: 'Молдова', dial: '+373', flag: '🇲🇩' },
  { code: 'PL', name: 'Польша', dial: '+48', flag: '🇵🇱' },
  { code: 'RU', name: 'Россия', dial: '+7', flag: '🇷🇺' },
  { code: 'US', name: 'США', dial: '+1', flag: '🇺🇸' },
  { code: 'TJ', name: 'Таджикистан', dial: '+992', flag: '🇹🇯' },
  { code: 'TM', name: 'Туркменистан', dial: '+993', flag: '🇹🇲' },
  { code: 'TR', name: 'Турция', dial: '+90', flag: '🇹🇷' },
  { code: 'UZ', name: 'Узбекистан', dial: '+998', flag: '🇺🇿' },
  { code: 'UA', name: 'Украина', dial: '+380', flag: '🇺🇦' },
  { code: 'FR', name: 'Франция', dial: '+33', flag: '🇫🇷' },
];

const PhoneInput = ({ value, onChange, placeholder = 'Ваш номер телефона', variant = 'default', error = false, className = '' }) => {
  const russiaCountry = countries.find((c) => c.code === 'RU');
  const [selectedCountry, setSelectedCountry] = useState(russiaCountry);
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (value && value.startsWith('+')) {
      let country;
      if (value.startsWith('+7')) {
        country = countries.find((c) => c.code === 'RU');
      } else {
        country = countries.find((c) => value.startsWith(c.dial));
      }
      if (country) {
        setSelectedCountry(country);
        setPhoneNumber(value.slice(country.dial.length));
      }
    } else {
      setPhoneNumber('');
      setSelectedCountry(russiaCountry);
    }
  }, [value]);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    onChange(country.dial + phoneNumber);
    inputRef.current?.focus();
  };

  const handlePhoneChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '');
    setPhoneNumber(digits);
    onChange(selectedCountry.dial + digits);
  };

  const containerClass = [
    variant === 'modal' ? 'phone-input--modal' : 'phone-input',
    error ? 'phone-input--error' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClass} ref={containerRef}>
      <div className="phone-input__wrapper">
        <button
          type="button"
          className={`phone-input__country-btn ${isOpen ? 'phone-input__country-btn--open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="phone-input__flag">{selectedCountry.flag}</span>
          <span className="phone-input__dial">{selectedCountry.dial}</span>
          <svg
            className={`phone-input__arrow ${isOpen ? 'phone-input__arrow--open' : ''}`}
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
          >
            <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <input
          ref={inputRef}
          type="tel"
          className="phone-input__input"
          placeholder={placeholder}
          value={phoneNumber}
          onChange={handlePhoneChange}
        />
      </div>
      {isOpen && (
        <div className="phone-input__dropdown">
          <div className="phone-input__countries">
            {countries.map((country) => (
              <button
                key={country.code}
                type="button"
                className={`phone-input__country-item ${selectedCountry.code === country.code ? 'phone-input__country-item--selected' : ''}`}
                onClick={() => handleCountrySelect(country)}
              >
                <span className="phone-input__country-flag">{country.flag}</span>
                <span className="phone-input__country-name">{country.name}</span>
                <span className="phone-input__country-dial">{country.dial}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhoneInput;
