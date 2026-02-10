import { logo } from '../assets/images';
import { FaTelegramPlane, FaPhoneAlt } from 'react-icons/fa';
import { MdOutlineEmail } from "react-icons/md";
import messengerIcon from '../assets/images/logos/max.webp';

export const headerData = {
  logoImage: logo,
  logoAlt: 'Логотип KPI Studios',
  logoTitle: 'Студия комерческого дизайна',
  contacts: [
    {
      icon: FaPhoneAlt,
      href: 'tel:+79960545054',
      text: '+7 (966) 054-50-54',
      caption: 'Пн-Пт: 09:00-19:00',
    },
    {
      icon: MdOutlineEmail,
      href: 'mailto:impera-design@mail.ru',
      text: 'impera-design@mail.ru',
      caption: 'Напишите нам на почту',
    },
  ],
  ctaLabel: 'Задать вопрос',
  socials: [
    {
      icon: FaTelegramPlane,
      label: 'Telegram',
      href: 'https://t.me/impera_design',
    },
    {
      icon: messengerIcon,
      label: 'Max',
      href: 'https://max.ru/u/f9LHodD0cOL32fo5oeSRksJ8PrQ-J9iQqxXimia1fe7yhMpJSQmQcDFcKlA',
      iconType: 'img',
    },
  ],
};
