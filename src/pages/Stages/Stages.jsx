import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue } from 'framer-motion';
import StickyHeader from '../../components/StickyHeader/StickyHeader';
import Breadcrumbs from '../../components/Widgets/Breadcrumbs/Breadcrumbs';
import Footer from '../../components/Footer/Footer';
import { stagesData, stagesPageData } from '../../data/stagesData';
import './Stages.css';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const Motion = motion;

function Stages() {
  const containerRef = useRef(null);
  const listRef = useRef(null);
  const lastStepRef = useRef(null);
  const asideRef = useRef(null);
  const asideCardRef = useRef(null);
  
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

  // Sticky logic for aside card (manual fix)
  useEffect(() => {
    const bodySection = containerRef.current;
    const asideBlock = asideRef.current;
    const cardContent = asideCardRef.current;
    const listBlock = listRef.current;

    if (!bodySection || !asideBlock || !cardContent || !listBlock) return;

    const stickyTop = 120;

    // Устанавливаем минимальную высоту под высоту списка
    const setAsideHeight = () => {
      const listHeight = listBlock.offsetHeight;
      asideBlock.style.minHeight = `${listHeight}px`;
    };

    const handleScroll = () => {
      const bodyRect = bodySection.getBoundingClientRect();
      const asideRect = asideBlock.getBoundingClientRect();
      const cardHeight = cardContent.offsetHeight;

      // Секция еще не дошла до верхнего порога
      if (bodyRect.top > stickyTop) {
        cardContent.style.position = 'relative';
        cardContent.style.top = '';
        cardContent.style.left = '';
        cardContent.style.width = '';
        return;
      }

      // Достигли низа списка — ставим карточку в конец aside
      const bodyBottomSpace = bodyRect.bottom - stickyTop - cardHeight;
      if (bodyBottomSpace <= 0) {
        cardContent.style.position = 'absolute';
        cardContent.style.top = `${listBlock.offsetHeight - cardHeight}px`;
        cardContent.style.left = '0';
        cardContent.style.width = '100%';
        return;
      }

      // Фиксируем карточку
      cardContent.style.position = 'fixed';
      cardContent.style.top = `${stickyTop}px`;
      cardContent.style.left = `${asideRect.left}px`;
      cardContent.style.width = `${asideRect.width}px`;
    };

    const handleResize = () => {
      cardContent.style.position = 'relative';
      cardContent.style.top = '';
      cardContent.style.left = '';
      cardContent.style.width = '';
      asideBlock.style.minHeight = '';
      setAsideHeight();
      handleScroll();
    };

    setAsideHeight();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="stages-page">
      <StickyHeader />

      <main className="stages">
        <section className="stages-hero">
          <img src={stagesPageData.hero.background} alt="" className="stages-hero__bg" />
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
              {stagesPageData.hero.eyebrow}
            </Motion.span>

            <Motion.h1
              className="stages-hero__title"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {stagesPageData.hero.title}
            </Motion.h1>

            <Motion.p
              className="stages-hero__lead"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {stagesPageData.hero.lead}
            </Motion.p>

            <div className="stages-hero__tags">
              {stagesPageData.hero.tags.map((tag) => (
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
          <aside className="stages-aside" ref={asideRef}>
            <div className="stages-aside__card" ref={asideCardRef}>
              <div className="stages-aside__card-content">
                <div className="stages-aside__meta">
                  <span className="stages-aside__label">{stagesPageData.aside.label}</span>
                </div>
                <p className="stages-aside__text">
                  {stagesPageData.aside.text}
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
                      <span className="stages-aside__tick-label">{index + 1} {stagesPageData.aside.stepPrefix}</span>
                    </div>
                  ))}
                </div>
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
                    <span className="stages-step__index">{index + 1} {stagesPageData.aside.stepPrefix}</span>
                    <span className="stages-step__subtitle">{stage.subtitle}</span>
                  </div>
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
                    <div className="stages-step__result-label">{stagesPageData.texts.resultLabel}</div>
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
              <img src={stagesPageData.footer.background} alt="" className="stages-footer__bg" />
              <div className="stages-footer__glow" />
            </div>
            <div className="stages-footer__content">
              <p className="stages-footer__label">{stagesPageData.footer.label}</p>
              <h3 className="stages-footer__title">
                {stagesPageData.footer.title.map((part, i, arr) => (
                  <React.Fragment key={i}>
                    {part}
                    {i < arr.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h3>
              <p className="stages-footer__text">
                {stagesPageData.footer.text.map((part, i, arr) => (
                  <React.Fragment key={i}>
                    {part}
                    {i < arr.length - 1 && <br />}
                  </React.Fragment>
                ))}
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

