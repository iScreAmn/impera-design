import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion as Motion } from 'motion/react';
import StickyHeader from '../../components/StickyHeader/StickyHeader';
import Footer from '../../components/Footer/Footer';
import Breadcrumbs from '../../components/Widgets/Breadcrumbs/Breadcrumbs';
import { background1, background2, background3, background4, background5 } from '../../assets/images';
import './Services.css';

const MotionDiv = Motion.div;
const MotionH1 = Motion.h1;
const MotionP = Motion.p;
const MotionArticle = Motion.article;

const servicesData = [
  {
    id: 'service-1',
    title: 'ПОЛНЫЙ ДИЗАЙН-ПРОЕКТ',
    summary: 'Подробная инструкция по будущему интерьеру с бюджетом, сценариями и прозрачными решениями.',
    deliverables: [
      'Выезд на объект, профессиональный замер и заполнение ТЗ',
      '2–3 планировочных решения с расстановкой мебели',
      'Фотореалистичные 3D-визуализации (3–4 ракурса каждого помещения)',
      'Развертки стен, спецификация материалов, мебели и декора с артикулами и ценами',
      'Полный комплект рабочих чертежей для строителей'
    ],
    price: 'Цена от 2000 ₽ за м²',
    background: background2,
    badge: 'Комплекс'
  },
  {
    id: 'service-2',
    title: 'ЗD-ВИЗУАЛИЗАЦИИ',
    summary: 'Быстро проверяем идею и показываем реалистичную картинку будущего пространства без полного комплекта чертежей.',
    deliverables: [
      'Выезд и замер, фиксация пожеланий по стилю и функциональности',
      'Несколько планировочных вариантов',
      'Фотореалистичные 3D-визуализации (3–4 ракурса каждого помещения)',
      'Спецификация материалов, мебели и декора: количество, артикулы, магазины, цены'
    ],
    price: 'Цена от 1300 ₽ за м²',
    background: background1,
    badge: 'Концепция'
  },
  {
    id: 'service-3',
    title: 'РАБОЧИЕ ЧЕРТЕЖИ',
    summary: 'Технический фундамент ремонта: точные схемы, размеры и инженерные решения для строителей.',
    deliverables: [
      'Выезд и профессиональный замер помещения',
      'Несколько вариантов планировочных решений',
      'Полный комплект рабочих чертежей для строителей'
    ],
    price: 'Цена от 1000 ₽ за м²',
    background: background4,
    badge: 'Документация'
  },
  {
    id: 'service-4',
    title: 'РЕМОНТ «ПОД КЛЮЧ»',
    summary: 'Реализуем проект силами проверённых подрядчиков: от сметы до финальной сдачи под контроль автора.',
    deliverables: [
      'Ремонт по согласованному дизайн-проекту',
      'Сертифицированные специалисты и контроль сроков',
      'Координация этапов в рамках авторского надзора',
      'Согласование материалов и технических решений'
    ],
    price: 'Стоимость обсуждается индивидуально',
    background: background5,
    badge: 'Реализация'
  },
  {
    id: 'service-5',
    title: 'АВТОРСКИЙ НАЗДОР',
    summary: 'Регулярный контроль стройки дизайнером, чтобы итог совпал с утверждённым проектом без сюрпризов.',
    deliverables: [
      'До 4 выездов в месяц на объект или в торговую точку',
      'Контроль соответствия работ проектной документации',
      'Корректировки технических решений на месте',
      'Подбор и согласование материалов, мебели, света',
      'Информирование клиента о ходе ремонта'
    ],
    price: 'Стоимость обсуждается индивидуально',
    background: background3,
    badge: 'Контроль'
  }
];

function Services() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      // Дожидаемся полного рендеринга страницы
      const timer = setTimeout(() => {
        const target = document.querySelector(location.hash);
        if (target) {
          const stickyHeader = document.querySelector('.sticky-header');
          const headerHeight = stickyHeader ? stickyHeader.offsetHeight : 140;
          
          // Вычисляем позицию с учетом высоты header + небольшой отступ
          const elementTop = target.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementTop - headerHeight - 50; // +20px для дополнительного отступа

          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: 'smooth'
          });
        }
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <div className="services">
      <StickyHeader />

      <div className="services-breadcrumbs">
        <div className="services-breadcrumbs__container">
          <Breadcrumbs />
        </div>
      </div>

      <section className="services__hero">
        <div className="services__hero-overlay" />
        <div className="services__hero-content">
          <MotionH1
            className="services__title"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
          >
            Полный цикл услуг по интерьеру
          </MotionH1>
          <MotionP
            className="services__subtitle"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.12 }}
          >
            От концепции до сдачи под ключ: визуализация, документация, стройка и постоянный контроль качества.
          </MotionP>
          <MotionDiv
            className="services__cta"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.18 }}
          >
            <Link to="/contacts" className="services__cta-button services__cta-button--primary">
              Запросить консультацию
            </Link>
            <a href="tel:+79917761559" className="services__cta-button services__cta-button--ghost">
              Позвонить студии
            </a>
          </MotionDiv>
        </div>
      </section>

      <section className="services__wrapper" aria-label="Список услуг Impera Studio">
        {servicesData.map((service, index) => (
          <MotionArticle
            key={service.id}
            id={service.id}
            className="service-item"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.65, ease: 'easeOut', delay: index * 0.05 }}
          >
            <div
              className="service-item__image"
              style={{ backgroundImage: `linear-gradient(160deg, rgba(10,10,10,0.75), rgba(10,10,10,0.35)), url(${service.background})` }}
              role="presentation"
            >
              <div className="service-item__badge">{service.badge}</div>
            </div>

            <div className="service-item__content">
              <p className="service-item__eyebrow">Услуга {index + 1}</p>
              <h2 className="service-item__title">{service.title}</h2>
              <p className="service-item__description">{service.summary}</p>
              <div className="service-item__list-wrap">
                <p className="service-item__list-title">В рамках услуги вы получаете:</p>
                <ul className="service-item__list">
                  {service.deliverables.map((item) => (
                    <li key={item} className="service-item__list-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="service-item__footer">
                <span className="service-item__price">{service.price}</span>
                <div className="service-item__actions">
                  <Link to="/contacts" className="service-item__button service-item__button--primary">
                    Обсудить проект
                  </Link>
                  <a href={`mailto:studio-lafee@yandex.ru?subject=${encodeURIComponent(service.title)}`} className="service-item__button service-item__button--ghost">
                    Написать на почту
                  </a>
                </div>
              </div>
            </div>
          </MotionArticle>
        ))}
      </section>

      <Footer />
    </div>
  );
}

export default Services;

