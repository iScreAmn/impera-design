import React from 'react';
import { Link } from 'react-router-dom';
import { logo } from '../../assets/images';
import { navigationItems } from '../../data/navigationData';
import { footerData } from '../../data/footerData';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { description, contacts, socials, legal } = footerData;

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__top">
          <div className="footer__about">
            <Link to="/" className="footer__logo">
              <img src={logo} alt="Логотип Impera Design" className="footer__logo-image" />
            </Link>
            <p className="footer__description">
              {description}
            </p>
            <div className="footer__socials">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="footer__social-link"
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="footer__social-icon" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="footer__nav">
            <h3 className="footer__title">Навигация</h3>
            <ul className="footer__nav-list">
              {navigationItems.slice(0, 4).map((item) => (
                <li key={item.path} className="footer__nav-item">
                  <Link to={item.path} className="footer__nav-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__nav">
            <h3 className="footer__title">Разделы</h3>
            <ul className="footer__nav-list">
              {navigationItems.slice(4).map((item) => (
                <li key={item.path} className="footer__nav-item">
                  <Link to={item.path} className="footer__nav-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__contacts">
            <h3 className="footer__title">Контакты</h3>
            <ul className="footer__contacts-list">
              {contacts.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <li key={index} className="footer__contact-item">
                    <Icon className="footer__contact-icon" />
                    <div className="footer__contact-info">
                      <span className="footer__contact-label">{contact.label}</span>
                      <a href={contact.href} className="footer__contact-link">
                        {contact.text}
                      </a>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} {legal.companyName}. Все права защищены.
          </p>
          <div className="footer__legal">
            <a href={legal.privacyPolicy.href} className="footer__legal-link">
              {legal.privacyPolicy.text}
            </a>
            <span className="footer__divider">•</span>
            <a href={legal.termsOfUse.href} className="footer__legal-link">
              {legal.termsOfUse.text}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;