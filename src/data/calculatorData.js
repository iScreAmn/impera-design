import { thanku, photo1, document, checklist } from '../assets/images';
import { IoMdCheckboxOutline } from "react-icons/io";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

export const calculatorData = {
  title: 'Рассчитать стоимость услуг в калькуляторе',
  titleAccent: '+ получить бонус',
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
      question: 'Какие услуги вас интересуют?',
      subtitle: 'Выберите один или несколько вариантов',
      options: [
        'Ремонт',
        'Дизайн-проект',
        'Меблировка помещений'
      ],
      multiple: true
    },
    {
      field: 'style',
      question: 'Какой стиль интерьера вам ближе?',
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
    },
    {
      field: 'timeline',
      question: 'Когда вы планируете начать?',
      options: [
        'В течение месяца',
        'Через 1-3 месяца',
        'Через 3-6 месяцев',
        'Интересуюсь, собираю информацию'
      ],
      multiple: false
    }
  ],
  contactMethods: [
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: FaWhatsapp
    },
    {
      id: 'telegram',
      label: 'Telegram',
      icon: FaTelegramPlane
    },
    {
      id: 'email',
      label: 'Email',
      icon: MdOutlineEmail
    }
  ],
  consultant: {
    name: 'Ольга Коршунова',
    role: 'Менеджер по продажам',
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
    },
    {
      icon: IoMdCheckboxOutline,
      text: 'Чек-лист самостоятельного ремонта',
      image: checklist
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
    text: 'Нажимая кнопку вы соглашаетесь с условиями',
    linkText: 'обработки персональных данных',
    href: '#'
  },
  progressTexts: {
    prefix: 'Готово',
    finalLabel: 'Остался завершающий шаг!',
    finalHeading: 'Отлично. Остался последний шаг!',
    finalSubtitle: 'Заполните форму чтобы мы могли прислать вам результат.',
    submittedHeading: 'Наш менеджер свяжется с вами в ближайшее время',
    submittedSubtitle: 'Мы уже обрабатываем вашу заявку.'
  },
  contactQuestion: 'Выберите куда вам отправить расчет стоимости?',
  thankYouImage: thanku,
  thankYouAlt: 'Спасибо'
};
