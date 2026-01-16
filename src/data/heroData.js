import { background } from '../assets/images';
import { FaCheck } from "react-icons/fa6";

export const heroData = {
  backgroundImage: background,
  backgroundAlt: 'Интерьер современного пространства',
  title: 'Дизайн интерьера коммерческих объектов',
  emphasis: 'ПОЛНОГО ЦИКЛА',
  subtitle: 'Создаём интерьеры, которые вдохновляют и увеличивают прибыль',
  ctaLabel: 'Узнать стоимость',
  features: [
    {
      icon: FaCheck,
      title: 'Дизайн-проект:',
      text: 'создадим пространство под подребности Вашего бизнеса',
    },
    {
      icon: FaCheck,
      title: '3D-визуализация:',
      text: 'наглядно покажем, как будет выглядеть Ваш интерьер',
    },
    {
      icon: FaCheck,
      title: 'Планировочные решения:',
      text: 'оптимально организуем каждую зону Вашего пространства',
    },
    {
      icon: FaCheck,
      title: 'Подбор материалов и мебели:',
      text: 'гарантируем стиль и качество с учетом Вашего бюджета',
    },
  ],
};
