import React, { useEffect, useRef } from 'react';
import { animate, inView } from 'motion';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { historyData } from '../../../data/historyData';
import './History.css';

const History = () => {
  const { title, subtitle, description, milestones } = historyData;
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const leftAnimRef = useRef(null);

  useEffect(() => {
    if (!leftAnimRef.current) return;

    const stop = inView(
      leftAnimRef.current,
      () => {
        animate(
          leftAnimRef.current,
          { opacity: [0, 1], y: [30, 0] },
          {
            duration: 0.8,
            easing: 'ease-out'
          }
        );
      },
      { amount: 0.3 }
    );

    return () => stop();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const leftBlock = leftRef.current;

    if (!section || !leftBlock) return;

    const leftContent = leftBlock.querySelector('.history__left-content');
    const rightBlock = section.querySelector('.history__right');
    if (!leftContent || !rightBlock) return;

    // Устанавливаем высоту левого блока равной высоте правого
    const setLeftHeight = () => {
      const rightHeight = rightBlock.offsetHeight;
      leftBlock.style.minHeight = `${rightHeight}px`;
    };

    const handleScroll = () => {
      const containerRect = section.querySelector('.history__container').getBoundingClientRect();
      const leftBlockRect = leftBlock.getBoundingClientRect();
      const leftHeight = leftContent.offsetHeight;
      const stickyTop = 120;

      // Секция еще не в зоне видимости
      if (containerRect.top > stickyTop) {
        leftBlock.classList.remove('is-fixed', 'is-bottom');
        leftContent.style.width = '';
        leftContent.style.left = '';
        return;
      }

      // Левый блок достиг конца - прижимаем к низу
      if (leftBlockRect.bottom < stickyTop + leftHeight) {
        leftBlock.classList.remove('is-fixed');
        leftBlock.classList.add('is-bottom');
        leftContent.style.width = '';
        leftContent.style.left = '';
        return;
      }

      // Секция в зоне видимости - фиксируем
      if (!leftBlock.classList.contains('is-fixed')) {
        const leftRect = leftBlock.getBoundingClientRect();
        leftContent.style.width = `${leftRect.width}px`;
        leftContent.style.left = `${leftRect.left}px`;
      }
      leftBlock.classList.add('is-fixed');
      leftBlock.classList.remove('is-bottom');
    };

    const handleResize = () => {
      leftBlock.classList.remove('is-fixed', 'is-bottom');
      leftContent.style.width = '';
      leftContent.style.left = '';
      leftBlock.style.minHeight = '';
      setLeftHeight();
      handleScroll();
    };

    setLeftHeight();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="history" ref={sectionRef}>
      <div className="history__container about-section">
        <div 
          ref={leftRef}
          className="history__left"
        >
          <div 
            ref={leftAnimRef}
            className="history__left-content"
            style={{ opacity: 0, transform: 'translateY(30px)' }}
          >
            <h2 className="history__title">
              {title} <span className="history__title-accent">{subtitle}</span>
            </h2>
            <p className="history__text">{description}</p>
          </div>
        </div>

        <div className="history__right">
          {milestones.map((item) => (
            <div className="history__item" key={item.id}>
              <div className="history__item-icon">
                <MdOutlineKeyboardArrowDown />
              </div>
              <div className="history__item-content">
                <div className="history__item-header">
                  <span className="history__item-year">{item.id}</span>
                  <h3 className="history__item-title">{item.title}</h3>
                </div>
                <p className="history__item-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default History;
