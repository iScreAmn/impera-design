import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { navigationItems } from '../../data/navigationData';
import { headerData } from '../../data/headerData';
import { logoMini } from '../../assets/images';
import Modal from '../Widgets/Modals/Modal';
import useModal from '../../utils/useModal';
import './Navigation.css';

const MotionDiv = motion.div;
const MotionNav = motion.nav;

function Navigation() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const drawerRef = useRef(null);
  const touchStartY = useRef(null);
  const { socials, logoAlt, ctaLabel } = headerData;
  const { isOpen: isModalOpen, openModal, closeModal } = useModal();
  const [formData, setFormData] = useState({ name: '', email: '', question: '' });

  const isFormValid = formData.name.trim() && formData.email.trim() && formData.question.trim();

  const closeMenu = () => {
    setIsOpen(false);
    setDragOffset(0);
    touchStartY.current = null;
  };

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== 'Tab') return;
      const focusable = drawerRef.current?.querySelectorAll('a, button');
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
    };

    const focusable = drawerRef.current?.querySelectorAll('a, button');
    focusable?.[0]?.focus();
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.setProperty('overflow', 'hidden');
      return () => document.body.style.removeProperty('overflow');
    }

    document.body.style.removeProperty('overflow');
    return undefined;
  }, [isOpen]);

  const handleTouchStart = (event) => {
    if (!isOpen) return;
    touchStartY.current = event.touches[0].clientY;
  };

  const handleTouchMove = (event) => {
    if (!isOpen || touchStartY.current === null) return;
    const delta = event.touches[0].clientY - touchStartY.current;
    setDragOffset(delta > 0 ? delta : 0);
  };

  const handleTouchEnd = () => {
    if (!isOpen) return;
    if (dragOffset > 90) {
      closeMenu();
    }
    setDragOffset(0);
    touchStartY.current = null;
  };

  const handleModalChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    setFormData({ name: '', email: '', question: '' });
    closeModal();
    closeMenu();
  };

  return (
    <nav className="navigation" aria-label="Основная навигация">
      <div className="navigation__container">
        <ul className="navigation__list">
          {navigationItems.map((item) => (
            <li key={item.path} className="navigation__item">
              <Link
                to={item.path}
                className={`navigation__link ${
                  location.pathname === item.path ? 'navigation__link--active' : ''
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={`navigation__burger ${isOpen ? 'navigation__burger--active' : ''}`}
          aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={isOpen}
          aria-controls="mobile-drawer"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="navigation__burger-lines" aria-hidden="true">
            <span className="navigation__burger-line" />
            <span className="navigation__burger-line" />
            <span className="navigation__burger-line" />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <MotionDiv
              className="navigation__overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              onClick={closeMenu}
            />
            <MotionNav
              ref={drawerRef}
              id="mobile-drawer"
              className="navigation__drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Мобильное меню"
              initial={{ opacity: 0, y: -36, scale: 0.98 }}
              animate={{ opacity: 1, y: dragOffset || 0, scale: 1 }}
              exit={{ opacity: 0, y: -28, scale: 0.98 }}
              transition={{ duration: 0.34, ease: [0.4, 0, 0.2, 1] }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="navigation__drawer-header">
                <Link to="/" className="navigation__brand" onClick={closeMenu}>
                  <img src={logoMini} alt={logoAlt} className="navigation__brand-logo" />
                  <span className="navigation__brand-text">Impera Studio</span>
                </Link>
                <button
                  type="button"
                  className="navigation__close"
                  onClick={closeMenu}
                  aria-label="Закрыть меню"
                >
                  <span />
                  <span />
                </button>
              </div>

              <ul className="navigation__drawer-list">
                {navigationItems.map((item) => (
                  <li key={item.path} className="navigation__drawer-item">
                    <Link
                      to={item.path}
                      className={`navigation__drawer-link ${
                        location.pathname === item.path ? 'navigation__drawer-link--active' : ''
                      }`}
                      onClick={closeMenu}
                    >
                      <span>{item.label}</span>
                      <span className="navigation__drawer-dot" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="navigation__drawer-cta">
                <button
                  type="button"
                  className="navigation__drawer-button"
                  onClick={openModal}
                >
                  {ctaLabel}
                </button>
              </div>

              <div className="navigation__drawer-footer">
                <div className="navigation__drawer-socials" aria-label="Социальные сети">
                  {socials.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="navigation__drawer-social"
                        aria-label={social.label}
                      >
                        <Icon />
                      </a>
                    );
                  })}
                </div>
              </div>
            </MotionNav>
          </>
        )}
      </AnimatePresence>

      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        title="Задать вопрос"
        className="question-modal"
      >
        <p className="question-modal__subtitle">
          Задайте ваш вопрос, и мы ответим в ближайшее время
        </p>
        <form className="question-modal__form" onSubmit={handleModalSubmit}>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleModalChange}
            placeholder="Ваше имя"
            className="question-modal__input"
          />
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleModalChange}
            placeholder="Email для ответа"
            className="question-modal__input"
          />
          <textarea 
            name="question"
            value={formData.question}
            onChange={handleModalChange}
            placeholder="Ваш вопрос..."
            className="question-modal__textarea"
            rows="4"
          />
          <button 
            type="submit" 
            className="question-modal__submit"
            disabled={!isFormValid}
          >
            Отправить
          </button>
        </form>
      </Modal>
    </nav>
  );
}

export default Navigation;

