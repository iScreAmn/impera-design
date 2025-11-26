import React from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { advantageData } from '../../data/advantageData';
import './Advantage.css';

const Advantage = () => {
  const { title, subtitle, description, advantages } = advantageData;

  return (
    <section className="advantage">
      <div className="advantage__container">
        <div className="advantage__left">
          <h2 className="advantage__title">
            {title} <span className="advantage__title-accent">{subtitle}</span>
          </h2>
          <p className="advantage__text">{description}</p>
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