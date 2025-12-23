import { logo } from '../assets/images';
import { FaTelegramPlane, FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';
import { MdOutlineEmail } from "react-icons/md";

export const headerData = {
  logoImage: logo,
  logoAlt: 'Логотип KPI Studios',
  logoTitle: 'Студия комерческого дизайна',
  contacts: [
    {
      icon: FaPhoneAlt,
      href: 'tel:+79917761559',
      text: '+7 (991) 776-15-59',
      caption: 'Пн-Пт: 09:00-19:00',
    },
    {
      icon: MdOutlineEmail,
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
