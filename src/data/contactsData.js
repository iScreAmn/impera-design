import { FaPhoneAlt, FaEnvelope, FaClock, FaTelegramPlane } from 'react-icons/fa';
import messengerIcon from '../assets/images/logos/max.webp';

// Все тексты страницы
export const texts = {
  pageTitle: 'Контакты',
  addressTitle: 'Адрес',
  socialsLabel: 'Соц. сети:',
  buildRouteBtn: 'Построить маршрут',
  ctaBtn: 'Заказать звонок',
  modal: {
    title: 'Заказать звонок',
    namePlaceholder: 'Ваше имя',
    phonePlaceholder: 'Телефон',
    submitBtn: 'Отправить',
  },
};

// Контактные данные
export const contactsData = {
    phone: {
    value: '+7 (966) 054-50-54',
    link: 'tel:+79960545054',
    label: 'Ежедневно на связи',
  },
  email: {
    value: 'impera-design@mail.ru',
    link: 'mailto:impera-design@mail.ru',
    label: 'Служба поддержки',
  },
  workingHours: {
    value: 'Пн-Пт: 09:00-19:00',
    label: 'Режим работы',
  },
  address: {
    city: 'г. Москва',
    street: 'ул. Верхние Поля, д. 10',
    full: 'Москва, ул. Верхние Поля, д.10',
    coordinates: [55.662187, 37.746076],
  },
};

// Соц. сети
export const socialLinks = [
  {
    id: 'telegram',
    name: 'Telegram',
    icon: FaTelegramPlane,
    url: 'https://t.me/impera_design',
  },
  {
    id: 'max',
    name: 'Max',
    icon: messengerIcon,
    iconType: 'img',
    url: 'https://max.ru/u/f9LHodD0cOL32fo5oeSRksJ8PrQ-J9iQqxXimia1fe7yhMpJSQmQcDFcKlA',
  },
];

// Карточки контактов
export const infoCards = [
  {
    id: 'phone',
    icon: FaPhoneAlt,
    value: contactsData.phone.value,
    link: contactsData.phone.link,
    label: contactsData.phone.label,
    isLink: true,
  },
  {
    id: 'email',
    icon: FaEnvelope,
    value: contactsData.email.value,
    link: contactsData.email.link,
    label: contactsData.email.label,
    isLink: true,
  },
  {
    id: 'hours',
    icon: FaClock,
    value: contactsData.workingHours.value,
    label: contactsData.workingHours.label,
    isLink: false,
  },
];
