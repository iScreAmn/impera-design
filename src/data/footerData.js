import { FaTelegramPlane, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import messengerIcon from '../assets/images/art/max.webp';

export const footerData = {
  description: 'Студия коммерческого дизайна интерьера.\nСоздаём стильные и функциональные пространства для бизнеса.',
  
  contacts: [
    {
      icon: FaPhoneAlt,
      href: 'tel:+79960545054',
      text: '+7 (966) 054-50-54',
      label: 'Позвоните нам'
    },
    {
      icon: FaEnvelope,
      href: 'mailto:impera-design@mail.ru',
      text: 'impera-design@mail.ru',
      label: 'Напишите нам'
    },
    {
      icon: FaMapMarkerAlt,
      href: '#',
      text: 'г. Москва, ул. Верхние Поля, д. 10',
      label: 'Наш адрес'
    }
  ],

  socials: [
    {
      icon: FaTelegramPlane,
      label: 'Telegram',
      href: 'https://t.me/impera_design'
    },
    {
      icon: messengerIcon,
      label: 'Max',
      href: 'https://max.ru/u/f9LHodD0cOL32fo5oeSRksJ8PrQ-J9iQqxXimia1fe7yhMpJSQmQcDFcKlA',
      iconType: 'img',
    },
  ],

  legal: {
    companyName: 'Impera Design',
    privacyPolicy: {
      text: 'Политика конфиденциальности',
      href: '#'
    },
    termsOfUse: {
      text: 'Условия использования',
      href: '#'
    }
  }
};

