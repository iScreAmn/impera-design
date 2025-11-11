import { logo } from '../assets/images';
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';

export const headerData = {
  logoImage: logo,
  logoAlt: 'Логотип KPI Studios',
  logoTitle: 'Студия комерческого дизайна',
  contacts: [
    {
      icon: '📞',
      href: 'tel:+79917761559',
      text: '+7 (991) 776-15-59',
      caption: 'Пн-Пт: 10:00-19:00',
    },
    {
      icon: '✉️',
      href: 'mailto:studio-lafee@yandex.ru',
      text: 'studio-lafee@yandex.ru',
      caption: 'Напишите нам на почту',
    },
  ],
  ctaLabel: 'Задайте вопрос онлайн',
  socials: [
    {
      icon: FaTelegramPlane,
      label: 'Telegram',
      href: '#',
    },
    {
      icon: FaWhatsapp,
      label: 'WhatsApp',
      href: '#',
    },
  ],
};
