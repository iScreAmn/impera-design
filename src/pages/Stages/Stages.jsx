import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue } from 'framer-motion';
import StickyHeader from '../../components/StickyHeader/StickyHeader';
import Breadcrumbs from '../../components/Widgets/Breadcrumbs/Breadcrumbs';
import Footer from '../../components/Footer/Footer';
import { background3, background4 } from '../../assets/images';
import './Stages.css';

const stagesData = [
  {
    id: 'preproject',
    title: 'Предпроектный этап',
    subtitle: 'эскизное проектирование',
    lead: 'Формируем фундамент будущего интерьера и фиксируем видение с первых встреч.',
    points: [
      'выезд на объект и профессиональный замер',
      'заполнение детального технического задания',
      'определение стиля, палитры и ключевых пожеланий',
      'разработка нескольких планировочных решений с мебелью',
      'коллажи/референсы по каждому помещению для согласования концепции',
    ],
    result:
      'Утверждённая планировка и направление стиля, на основе которых строится визуализация.',
  },
  {
    id: 'visualization',
    title: 'Визуализация проекта',
    subtitle: 'фотореализм и детализация',
    lead: 'Показываем, как будет выглядеть интерьер после ремонта — в цвете, фактуре и свете.',
    points: [
      'визуализация каждого помещения с учётом выбранных материалов',
      'подбор мебели, освещения и декора под стиль и бюджет',
      'корректировки после согласования с вами',
    ],
    result:
      'Готовый визуальный образ интерьера, понятный и заказчику, и строителям.',
  },
  {
    id: 'documentation',
    title: 'Рабочая документация',
    subtitle: 'технический пакет чертежей',
    lead: 'Даем подрядчикам точные инструкции, чтобы строить без ошибок и переделок.',
    points: [
      'полный комплект рабочих чертежей: демонтаж/монтаж, планировка, электрика, сантехника',
      'планы потолков, полов и развёртки стен по помещениям',
      'спецификация материалов, мебели и оборудования с артикулами, магазинами и ценами',
    ],
    result:
      'Проект получает чёткие, точные чертежи для безопасной и качественной реализации.',
  },
  {
    id: 'supervision',
    title: 'Авторский надзор',
    subtitle: 'контроль реализации',
    lead: 'Сопровождаем ремонт, держим качество и решения в фокусе, оперативно снимаем вопросы.',
    points: [
      'регулярные выезды на объект или в торговые точки (до 4 раз в месяц)',
      'проверка правильности работ по чертежам и консультации подрядчиков',
      'выезды в магазины, помощь в выборе и закупке материалов',
      'согласование и фиксация изменений в проекте при необходимости',
    ],
    result:
      'Интерьер реализуется именно так, как утверждено — без ошибок, задержек и лишних затрат.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const Motion = motion;

function Stages() {
  const containerRef = useRef(null);
  const listRef = useRef(null);
  const lastStepRef = useRef(null);
  
  // Отслеживаем прокрутку списка шагов
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 0.2', 'end 0.8'],
  });
  
  // Проверяем, виден ли последний шаг
  const isLastStepInView = useInView(lastStepRef, { once: false, amount: 0.3 });
  
  // Прогресс от скролла
  const scrollProgress = useTransform(scrollYProgress, [0, 0.6], [0, 1], { clamp: true });
  
  // Финальный прогресс: когда последний шаг виден, прогресс = 1, иначе используем scrollProgress
  const progress = useMotionValue(0);
  
  useEffect(() => {
    const unsubscribeScroll = scrollProgress.on('change', (latest) => {
      if (!isLastStepInView) {
        progress.set(latest);
      }
    });
    
    return unsubscribeScroll;
  }, [scrollProgress, progress, isLastStepInView]);
  
  useEffect(() => {
    if (isLastStepInView) {
      progress.set(1);
    }
  }, [isLastStepInView, progress]);


  return (
    <div className="stages-page">
      <StickyHeader />

      <main className="stages">
        <section className="stages-hero">
          <img src={background4} alt="" className="stages-hero__bg" />
          <div className="stages-hero__overlay" />
          <div className="stages-hero__breadcrumbs">
            <div className="stages-hero__breadcrumbs-container">
              <Breadcrumbs />
            </div>
          </div>
          <div className="stages-hero__content">
            <Motion.span
              className="stages-hero__eyebrow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Процесс с вниманием к деталям
            </Motion.span>

            <Motion.h1
              className="stages-hero__title"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Этапы работы
            </Motion.h1>

            <Motion.p
              className="stages-hero__lead"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Чёткая последовательность, прозрачные шаги и контроль качества на каждом этапе —
              чтобы вы видели путь от первой идеи до реализованного интерьера.
            </Motion.p>

            <div className="stages-hero__tags">
              {['исследуем', 'проектируем', 'визуализируем', 'контролируем'].map((tag) => (
                <Motion.span
                  key={tag}
                  className="stages-hero__tag"
                  whileHover={{ y: -3, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                >
                  {tag}
                </Motion.span>
              ))}
            </div>
          </div>

          
        </section>

        <section className="stages-body" ref={containerRef}>
          <aside className="stages-aside">
            <div className="stages-aside__card">
              <div className="stages-aside__meta">
                <span className="stages-aside__label">прозрачность процесса</span>
              </div>
              <p className="stages-aside__text">
                Каждый этап завершается понятным результатом — вы всегда знаете, что уже готово и
                что происходит дальше.
              </p>
              <div
                className="stages-aside__progress"
              >
                <Motion.span
                  className="stages-aside__progress-fill"
                  style={{ scaleY: progress }}
                  aria-hidden
                />
                {stagesData.map((stage, index) => (
                  <div key={stage.id} className="stages-aside__tick">
                    <span className="stages-aside__tick-dot" />
                    <span className="stages-aside__tick-label">{index + 1} шаг</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <div className="stages-list" ref={listRef}>
            {stagesData.map((stage, index) => (
              <Motion.article
                key={stage.id}
                ref={index === stagesData.length - 1 ? lastStepRef : null}
                className="stages-step"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                variants={fadeUp}
                transition={{ duration: 0.6, delay: 0.04 * index }}
              >
                <div className="stages-step__header">
                  <div className="stages-step__meta">
                    <span className="stages-step__index">{index + 1} шаг</span>
                    <span className="stages-step__subtitle">{stage.subtitle}</span>
                  </div>
                  <span className="stages-step__badge">этап</span>
                </div>

                <h3 className="stages-step__title">{stage.title}</h3>
                <p className="stages-step__lead">{stage.lead}</p>

                <div className="stages-step__grid">
                  <ul className="stages-step__list">
                    {stage.points.map((point) => (
                      <li key={point} className="stages-step__list-item">
                        <span className="stages-step__bullet" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="stages-step__result">
                    <div className="stages-step__result-label">Результат</div>
                    <p className="stages-step__result-text">{stage.result}</p>
                  </div>
                </div>
              </Motion.article>
            ))}
          </div>
        </section>

        <section className="stages-footer">
          <Motion.div
            className="stages-footer__card"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            <div className="stages-footer__visual">
              <img src={background3} alt="" className="stages-footer__bg" />
              <div className="stages-footer__glow" />
            </div>
            <div className="stages-footer__content">
              <p className="stages-footer__label">готовы обсудить проект</p>
              <h3 className="stages-footer__title">
                Начнём с пространства и задачи — покажем, как вырастает концепция
              </h3>
              <p className="stages-footer__text">
                Расскажите о ваших сроках, бюджете и ощущении, которое хотите от интерьера. Мы
                предложим сценарий шагов и зафиксируем его в плане.
              </p>
            </div>
          </Motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Stages;

