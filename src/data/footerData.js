import { FaTelegramPlane, FaWhatsapp, FaVk, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export const footerData = {
  description: 'Студия коммерческого дизайна интерьеров. Создаём стильные и функциональные пространства для бизнеса',
  
  contacts: [
    {
      icon: FaPhoneAlt,
      href: 'tel:+79917761559',
      text: '+7 (991) 776-15-59',
      label: 'Позвоните нам'
    },
    {
      icon: FaEnvelope,
      href: 'mailto:studio-lafee@yandex.ru',
      text: 'studio-lafee@yandex.ru',
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
      href: 'https://t.me/'
    },
    {
      icon: FaWhatsapp,
      label: 'WhatsApp',
      href: 'https://wa.me/'
    },
    {
      icon: FaVk,
      label: 'VKontakte',
      href: 'https://vk.com/lafee_remont'
    }
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

