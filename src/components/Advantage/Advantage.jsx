import React, { useEffect, useRef } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from 'motion/react';
import { advantageData } from '../../data/advantageData';
import './Advantage.css';

const itemFromLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const itemFromTop = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const Advantage = () => {
  const { title, subtitle, description, advantages } = advantageData;
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const isLeftInView = useInView(sectionRef, { once: true, amount: 0.15 });

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
          <motion.div
            className="advantage__left-content"
            initial="hidden"
            animate={isLeftInView ? 'visible' : 'hidden'}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
            }}
          >
            <motion.h2 className="advantage__title" variants={itemFromLeft}>
              {title} <span className="advantage__title-accent">{subtitle}</span>
            </motion.h2>
            <motion.p className="advantage__text" variants={itemFromLeft}>
              {description}
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          className="advantage__right"
          initial="hidden"
          animate={isLeftInView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
          }}
        >
          {advantages.map((item) => (
            <motion.div className="advantage__item" key={item.id} variants={itemFromTop}>
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Advantage;