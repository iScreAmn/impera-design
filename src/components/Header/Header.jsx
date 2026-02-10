import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { headerData } from '../../data/headerData';
import { logo } from '../../assets/images';
import useModal from '../../utils/useModal';
import QuestionModal from '../Widgets/Question/QuestionModal';
import './Header.css';

const pathTransition = { duration: 0.28, ease: [0.4, 0, 0.2, 1] };

const BurgerPath = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="2.6"
    stroke="currentColor"
    strokeLinecap="round"
    transition={pathTransition}
    {...props}
  />
);

function Header() {
  const {
    logoAlt,
    logoTitle,
    contacts,
    ctaLabel,
    socials,
  } = headerData;

  const { isOpen, openModal, closeModal } = useModal();
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 600px)');
    const fn = () => setIsMobileMenu(mq.matches);
    fn();
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);

  useEffect(() => {
    if (isBurgerOpen) {
      document.body.style.setProperty('overflow', 'hidden');
      return () => document.body.style.removeProperty('overflow');
    }
    document.body.style.removeProperty('overflow');
    return undefined;
  }, [isBurgerOpen]);

  const toggleBurger = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  const closeBurger = () => {
    setIsBurgerOpen(false);
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          <img src={logo} alt={logoAlt} className="header__logo-image" />
          <div className="header__logo-text">
            {logoTitle && <span className="header__title">{logoTitle}</span>}
          </div>
        </Link>

        <div className="header__contacts">
          {contacts.map((contact) => {
            const Icon = contact.icon;
            return (
              <div key={contact.href} className="header__contact">
                <div className="header__contact-info">
                  <a href={contact.href} className="header__contact-link">
                    {contact.text}
                  </a>
                  <span className="header__contact-label">{contact.caption}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="header__actions">
          <button className="header__button" type="button" onClick={openModal}>
            {ctaLabel}
          </button>
          <div className="header__social">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  className="header__social-link"
                  aria-label={social.label}
                >
                  {social.iconType === 'img' ? (
                    <img src={Icon} alt="" className="header__social-icon" aria-hidden />
                  ) : (
                    <Icon className="header__social-icon" />
                  )}
                </a>
              );
            })}
          </div>
          
          {/* Бургер-меню */}
          <button
            className="header__burger"
            type="button"
            onClick={toggleBurger}
            aria-label={isBurgerOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={isBurgerOpen}
          >
            <motion.svg
              width="23"
              height="23"
              viewBox="0 0 23 23"
              initial={false}
              animate={isBurgerOpen ? 'open' : 'closed'}
              aria-hidden
            >
              <BurgerPath
                variants={{
                  closed: { d: 'M 2 2.5 L 20 2.5' },
                  open: { d: 'M 3 16.5 L 17 2.5' },
                }}
              />
              <BurgerPath
                d="M 2 9.423 L 20 9.423"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                transition={{ duration: 0.16, ease: [0.4, 0, 0.2, 1] }}
              />
              <BurgerPath
                variants={{
                  closed: { d: 'M 2 16.346 L 20 16.346' },
                  open: { d: 'M 3 2.5 L 17 16.346' },
                }}
              />
            </motion.svg>
          </button>
        </div>
      </div>

      {isMobileMenu ? (
        <div className={`header__menu ${isBurgerOpen ? 'header__menu--open' : ''}`}>
          <div className="header__menu-content">
            {contacts.map((contact) => (
              <div key={contact.href} className="header__menu-item">
                <span className="header__menu-label">{contact.caption}</span>
                <a href={contact.href} className="header__menu-link" onClick={closeBurger}>
                  {contact.text}
                </a>
              </div>
            ))}
            <div className="header__menu-socials">
              <span className="header__menu-label">связаться онлайн</span>
              <div className="header__menu-social-links">
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      className="header__menu-social-link"
                      aria-label={social.label}
                      onClick={closeBurger}
                    >
                      {social.iconType === 'img' ? (
                        <img src={Icon} alt="" className="header__menu-social-icon" aria-hidden />
                      ) : (
                        <Icon className="header__menu-social-icon" />
                      )}
                      <span className="header__menu-social-text">{social.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={`header__dropdown ${isBurgerOpen ? 'header__dropdown--open' : ''}`}>
          <div className="header__dropdown-content">
            {contacts.map((contact) => (
              <div key={contact.href} className="header__dropdown-item">
                <span className="header__dropdown-label">{contact.caption}</span>
                <a href={contact.href} className="header__dropdown-link" onClick={closeBurger}>
                  {contact.text}
                </a>
              </div>
            ))}
            <div className="header__dropdown-socials">
              <span className="header__dropdown-label">связаться онлайн</span>
              <div className="header__dropdown-social-links">
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      className="header__dropdown-social-link"
                      aria-label={social.label}
                      onClick={closeBurger}
                    >
                      {social.iconType === 'img' ? (
                        <img src={Icon} alt="" className="header__dropdown-social-icon" aria-hidden />
                      ) : (
                        <Icon className="header__dropdown-social-icon" />
                      )}
                      <span className="header__dropdown-social-text">{social.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
            <button
              type="button"
              className="header__dropdown-button"
              onClick={() => { openModal(); closeBurger(); }}
            >
              {ctaLabel}
            </button>
          </div>
        </div>
      )}

      <QuestionModal isOpen={isOpen} onClose={closeModal} />
    </header>
  );
}

export default Header;

