import {
  bossLounge1,
  bossLounge2,
  bossLounge3,
  bossLounge4,
  lesnoiPark1,
  lesnoiPark2,
  lesnoiPark3,
  lesnoiPark4,
} from '../assets/images';

export const projectsData = [
  {
    id: 1,
    slug: 'boss-lounge',
    title: 'Кальянная «BOSS-LOUNGE»',
    location: 'г.Москва',
    date: '15 октября, 2024',
    area: '120',
    studio: 'Impera Studio',
    designer: 'Ольга Коршунова',
    type: 'Для бизнеса',
    description: 'Проект «Boss Lounge» — это современное кальянное пространство площадью 120 м², расположенное в деловом центре Москва Сити. Интерьер выполнен в стиле минимализм с акцентом на функциональность и престиж.',
    features: [
      'Панорамные окна с видом на город',
      'Система умного освещения',
      'Премиальные отделочные материалы',
      'Индивидуальная мебель по проекту',
    ],
    images: [bossLounge1, bossLounge2, bossLounge3, bossLounge4],
    thumbnails: [bossLounge1, bossLounge2, bossLounge3],
  },
  {
    id: 2,
    slug: 'lesnoi-park',
    title: '«ФОК парк-отель «Лесной»',
    location: 'г.Солнечногорск',
    date: '3 сентября, 2024',
    area: '85',
    studio: 'Impera Studio',
    designer: 'Ольга Коршунова',
    type: 'Для себя',
    description: 'Проект «Лесной парк» — это семейный комплекс площадью 385 м², расположенный в экологичном жилом комплексе. Интерьер выполнен в светлых тонах с природными акцентами и натуральными материалами.',
    features: [
      'Экологичные материалы',
      'Встроенные системы хранения',
      'Зонирование пространства',
      'Индивидуальное освещение в каждой зоне',
    ],
    images: [lesnoiPark1, lesnoiPark2, lesnoiPark3, lesnoiPark4],
    thumbnails: [lesnoiPark1, lesnoiPark2, lesnoiPark3],
  },
];

