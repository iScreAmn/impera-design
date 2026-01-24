import { thanku, photo1, document } from '../assets/images';
import { IoMdCheckboxOutline } from "react-icons/io";
import { FaTelegramPlane } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import messengerIcon from '../assets/images/logos/max-white.webp';

export const calculatorData = {
  title: 'Рассчитать стоимость услуг в калькуляторе',
  steps: [
    {
      field: 'area',
      question: 'Какая площадь помещения?',
      options: [
        'Менее 50 м²',
        '50-80 м²',
        '80-100 м²',
        '100-150 м²',
        'Более 150 м²'
      ],
      multiple: false
    },
    {
      field: 'services',
      question: 'Какие услуги Вас интересуют?',
      subtitle: 'Выберите один или несколько вариантов',
      options: [
        'Дизайн-проект',
        'Дизайн-проект + ремонт',
        'Чертежи для ремонта',
      ],
      multiple: true
    },
    {
      field: 'style',
      question: 'Какой стиль интерьера Вам ближе?',
      options: [
        'Современный',
        'Классический',
        'Минимализм',
        'Лофт',
        'Еще не определился'
      ],
      multiple: false
    },
    {
      field: 'budget',
      question: 'Ориентировочный бюджет?',
      options: [
        'Экономичный вариант',
        'Средний бюджет',
        'Премиальный сегмент',
        'Пока не определился'
      ],
      multiple: false
    }
  ],
  contactMethods: [
    {
      id: 'telegram',
      label: 'Telegram',
      icon: FaTelegramPlane
    },
    {
      id: 'messenger',
      label: 'MAX',
      icon: messengerIcon,
      iconType: 'img',
    },
    {
      id: 'email',
      label: 'Email',
      icon: MdOutlineEmail
    }
  ],
  consultant: {
    name: 'Ольга Коршунова',
    role: 'Руководитель студии',
    photo: photo1,
    messages: {
      default: 'Определение нужных услуг позволяет нам сразу предложить комплексное решение, сэкономив ваше время и силы.',
      final: 'Тип помещения влияет на подход к проекту. Например, дизайн квартиры и офиса существенно отличаются по функциональности и эстетике.'
    }
  },
  bonuses: [
    {
      icon: IoMdCheckboxOutline,
      text: 'Коммерческое предложение',
      image: document
    }
  ],
  placeholders: {
    phone: 'Ваш номер телефона',
    email: 'Ваш email',
    name: 'Ваше имя'
  },
  buttons: {
    back: '←',
    next: 'Далее →',
    submit: 'Отправить',
    repeat: 'Повторить'
  },
  contactConsent: {
    text: 'Нажимая кнопку, Вы соглашаетесь с условиями',
    linkText: 'обработки персональных данных',
    href: '#'
  },
  progressTexts: {
    prefix: 'Готово',
    finalLabel: 'Остался завершающий шаг!',
    finalHeading: 'Отлично. Остался последний шаг!',
    submittedHeading: 'Наш менеджер свяжется с вами в ближайшее время',
    submittedSubtitle: 'Мы уже обрабатываем вашу заявку.'
  },
  contactQuestion: 'Выберите удобный способ связи',
  thankYouImage: thanku,
  thankYouAlt: 'Спасибо'
};
