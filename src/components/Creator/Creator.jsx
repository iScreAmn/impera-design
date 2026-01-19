import React from 'react'
import { Link } from 'react-router-dom'
import { SlArrowRight } from 'react-icons/sl'
import { photo2 } from '../../assets/images'
import './Creator.css'

const Creator = ({ title, name, intro, paragraphs, quote, imageAlt }) => {
  return (
    <section className="creator">
      <div className="creator__container">
        <div className="creator__image-wrapper">
          <img 
            src={photo2} 
            alt={imageAlt} 
            className="creator__image"
          />
          <Link to="/about" className="creator__overlay">
            <div className="creator__overlay-content">
              <span className="creator__overlay-text">Больше о компании</span>
              <SlArrowRight className="creator__overlay-arrow" />
            </div>
          </Link>
        </div>
        
        <div className="creator__content">
          <h2 className="creator__title">{title}</h2>
          
          <div className="creator__text">
            <p className="creator__intro">
              <strong>{name}</strong> {intro}
            </p>
            
            {paragraphs.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
            
            <p className="creator__quote">{quote}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Creator
