import React, { useEffect, useRef } from 'react';
import { animate, inView } from 'motion';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { historyData } from '../../../data/historyData';
import './History.css';

const History = () => {
  const { title, subtitle, description, milestones } = historyData;
  const leftRef = useRef(null);

  useEffect(() => {
    if (!leftRef.current) return;

    const stop = inView(
      leftRef.current,
      () => {
        animate(
          leftRef.current,
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

  return (
    <section className="history">
      <div className="history__container about-section">
        <div 
          ref={leftRef}
          className="history__left"
          style={{ opacity: 0, transform: 'translateY(30px)' }}
        >
          <h2 className="history__title">
            {title} <span className="history__title-accent">{subtitle}</span>
          </h2>
          <p className="history__text">{description}</p>
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
