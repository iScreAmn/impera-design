import { Link } from 'react-router-dom';
import { headerData } from '../../data/headerData';
import './Header.css';

function Header() {
  const {
    logoImage,
    logoAlt,
    logoTitle,
    contacts,
    ctaLabel,
    socials,
  } = headerData;

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          <img src={logoImage} alt={logoAlt} className="header__logo-image" />
          <div className="header__logo-text">
            {logoTitle && <span className="header__title">{logoTitle}</span>}
          </div>
        </Link>

        <div className="header__contacts">
          {contacts.map((contact) => (
            <div key={contact.href} className="header__contact">
              <span className="header__icon" aria-hidden="true">
                {contact.icon}
              </span>
              <div className="header__contact-info">
                <a href={contact.href} className="header__contact-link">
                  {contact.text}
                </a>
                <span className="header__contact-label">{contact.caption}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="header__actions">
          <button className="header__button" type="button">
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
                  <Icon className="header__social-icon" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

