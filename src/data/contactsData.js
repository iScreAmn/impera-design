import { FaPhoneAlt, FaEnvelope, FaClock, FaTelegramPlane, FaWhatsapp, FaVk } from 'react-icons/fa';

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
    url: 'https://t.me/',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: FaWhatsapp,
    url: 'https://wa.me/',
  },
  {
    id: 'vk',
    name: 'VKontakte',
    icon: FaVk,
    url: 'https://vk.com/lafee_remont',
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
