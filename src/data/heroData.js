import { background } from '../assets/images';
import { FaCheck } from "react-icons/fa6";

export const heroData = {
  backgroundImage: background,
  backgroundAlt: 'Интерьер современного пространства',
  title: 'Студия комерческого дизайна',
  emphasis: 'ПОЛНОГО ЦИКЛА',
  subtitle: 'Создаём интерьеры, которые вдохновляют и приносят доход',
  ctaLabel: 'Узнать стоимость',
  features: [
    {
      icon: FaCheck,
      title: 'Индивидуальный дизайн-проект:',
      text: 'создадим пространство под ваши предпочтения',
    },
    {
      icon: FaCheck,
      title: '3D-визуализация:',
      text: 'наглядно покажем, как будет выглядеть ваш интерьер',
    },
    {
      icon: FaCheck,
      title: 'Планировочные решения:',
      text: 'оптимально организуем каждую зону вашего пространства',
    },
    {
      icon: FaCheck,
      title: 'Подбор материалов и мебели:',
      text: 'гарантируем стиль и качество вашего интерьера',
    },
  ],
};
