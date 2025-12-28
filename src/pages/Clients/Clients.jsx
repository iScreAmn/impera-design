import { useMemo } from 'react';
import StickyHeader from '../../components/StickyHeader/StickyHeader';
import Breadcrumbs from '../../components/Widgets/Breadcrumbs/Breadcrumbs';
import Footer from '../../components/Footer/Footer';
import {
  client1,
  client2,
  client3,
  client4,
  client5,
  client6,
  logo,
} from '../../assets/images';
import './Clients.css';

const CLIENTS = [
  { name: 'Антонов и партнеры', focus: 'Девелоперские проекты', logo: client1 },
  { name: 'Boss Lounge', focus: 'Коммерческая недвижимость', logo: client2 },
  { name: 'Crazy Brothers', focus: 'Рсторан', logo: client3 },
  { name: 'Дворик Друзей', focus: 'Строительные решения', logo: client4 },
  { name: 'Lesnoy', focus: 'Световые системы', logo: client5 },
  { name: 'OMMA', focus: 'Ресторан', logo: client6 },
];

const INITIAL_TESTIMONIALS = [
  {
    id: 't1',
    name: 'Александр Воробьев',
    company: 'CEO, Urban Impact',
    text: 'Команда быстро предложила рабочие концепции и сопровождала согласования с девелопером без лишней бюрократии',
  },
  {
    id: 't2',
    name: 'Мария Деева',
    company: 'COO, Gastronomy Lab',
    text: 'Ресторан получил интерьер, который усиливает гостевой опыт. Ребята гибкие и держат сроки',
  },
  {
    id: 't3',
    name: 'Олег Савчук',
    company: 'Партнер, Eco Frame',
    text: 'Четкая коммуникация, современный дизайн и внимание к деталям на стройке. Сотрудничаем и дальше',
  },
];

function Clients() {
  const stats = useMemo(
    () => [
      { label: 'дизайн-проектов', value: '300+' },
      { label: 'средняя площадь реализованных проектов', value: '200 м²' },
      { label: 'экономии на ремонте за счёт проекта', value: 'до 40%' },
    ],
    []
  );

  return (
    <div className="clients-page">
      <StickyHeader />

      <div className="clients-breadcrumbs">
        <div className="clients-breadcrumbs__container">
          <Breadcrumbs />
        </div>
      </div>

      <section className="clients-hero">
        <div className="clients-hero__container">
          <div className="clients-hero__content">
            <div className="clients-hero__eyebrow">Партнерства, которые двигают бизнес</div>
            <h1 className="clients-hero__title">Наши клиенты</h1>
            <p className="clients-hero__subtitle">
              Мы проектируем пространства, которые усиливают бренды и создают измеримый эффект:
              от девелоперов и ритейла до ресторанов и офисов
            </p>
            <div className="clients-hero__stats">
              {stats.map((item) => (
                <div key={item.label} className="clients-hero__stat">
                  <div className="clients-hero__stat-value">{item.value}</div>
                  <div className="clients-hero__stat-label">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="clients-hero__card">
            <img src={logo} alt="Impera Design" className="clients-hero__logo" />
            <div className="clients-hero__card-text">
              <p>
                Синхронизируем архитектуру, инженерку и брендинг, чтобы каждый проект был собран
                как продукт: быстро, прозрачно, с вниманием к деталям
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="clients-list">
        <div className="clients-list__header">
          <div>
            <h2 className="clients-list__title">Клиенты, которые нам доверяют</h2>
            <p className="clients-list__subtitle">
              Двойной контроль качества и прозрачные процессы - поэтому к нам возвращаются
              с новыми задачами
            </p>
          </div>
        </div>

        <div className="clients-list__marquee">
          <div className="clients-list__fade clients-list__fade--left" aria-hidden />
          <div className="clients-list__fade clients-list__fade--right" aria-hidden />
          <div className="clients-list__track">
            {[...CLIENTS, ...CLIENTS].map((client, index) => (
              <article key={`${client.name}-${index}`} className="clients-list__card">
                <div className="clients-list__logo-box">
                  <img src={client.logo} alt={client.name} className="clients-list__logo" />
                </div>
                <div className="clients-list__info">
                  <h3 className="clients-list__name">{client.name}</h3>
                  <p className="clients-list__focus">{client.focus}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="clients-testimonials">
        <div className="clients-testimonials__header">
          <div>
            <h2 className="clients-testimonials__title">Отзывы</h2>
            <p className="clients-testimonials__subtitle">
              Реальные отзывы наших клиентов
            </p>
          </div>
        </div>

        <div className="clients-testimonials__grid">
          {INITIAL_TESTIMONIALS.map((item) => (
            <article key={item.id} className="clients-testimonials__card">
              <div className="clients-testimonials__quote">"{item.text}"</div>
              <div className="clients-testimonials__author">
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Clients;

