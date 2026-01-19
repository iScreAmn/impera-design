import { useState } from 'react';
import { Link } from 'react-router-dom';
import { headerData } from '../../data/headerData';
import { logo } from '../../assets/images';
import Modal from '../Widgets/Modals/Modal';
import useModal from '../../utils/useModal';
import './Header.css';

function Header() {
  const {
    logoAlt,
    logoTitle,
    contacts,
    ctaLabel,
    socials,
  } = headerData;

  const { isOpen, openModal, closeModal } = useModal();
  const [formData, setFormData] = useState({ name: '', email: '', question: '' });

  const isFormValid = formData.name.trim() && formData.email.trim() && formData.question.trim();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ name: '', email: '', question: '' });
    closeModal();
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
        </div>
      </div>

      <Modal 
        isOpen={isOpen} 
        onClose={closeModal}
        title="Задать вопрос"
        className="question-modal"
      >
        <p className="question-modal__subtitle">
          Задайте ваш вопрос, и мы ответим в ближайшее время
        </p>
        <form className="question-modal__form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ваше имя"
            className="question-modal__input"
          />
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email для ответа"
            className="question-modal__input"
          />
          <textarea 
            name="question"
            value={formData.question}
            onChange={handleChange}
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
    </header>
  );
}

export default Header;

