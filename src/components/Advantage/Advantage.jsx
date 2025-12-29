import React, { useEffect, useRef } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { advantageData } from '../../data/advantageData';
import './Advantage.css';

const Advantage = () => {
  const { title, subtitle, description, advantages } = advantageData;
  const sectionRef = useRef(null);
  const leftRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const leftBlock = leftRef.current;

    if (!section || !leftBlock) return;

    const leftContent = leftBlock.querySelector('.advantage__left-content');
    const rightBlock = section.querySelector('.advantage__right');
    if (!leftContent || !rightBlock) return;

    // Устанавливаем высоту левого блока равной высоте правого
    const setLeftHeight = () => {
      const rightHeight = rightBlock.offsetHeight;
      leftBlock.style.minHeight = `${rightHeight}px`;
    };

    const handleScroll = () => {
      const containerRect = section.querySelector('.advantage__container').getBoundingClientRect();
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
    <section className="advantage" ref={sectionRef}>
      <div className="advantage__container">
        <div className="advantage__left" ref={leftRef}>
          <div className="advantage__left-content">
            <h2 className="advantage__title">
              {title} <span className="advantage__title-accent">{subtitle}</span>
            </h2>
            <p className="advantage__text">{description}</p>
          </div>
        </div>

        <div className="advantage__right">
          {advantages.map((item) => (
            <div className="advantage__item" key={item.id}>
              <div className="advantage__item-icon">
                <MdOutlineKeyboardArrowDown />
              </div>
              <div className="advantage__item-content">
                <div className="advantage__item-header">
                  <span className="advantage__item-number">{item.id}</span>
                  <h3 className="advantage__item-title">{item.title}</h3>
                </div>
                <p className="advantage__item-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantage;