import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { SlArrowRight } from 'react-icons/sl'
import { motion, useInView } from 'motion/react'
import { photo2 } from '../../assets/images'
import './Creator.css'

const imageFromLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const contentFromRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const Creator = ({ title, name, intro, paragraphs, quote, imageAlt }) => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.12 })

  return (
    <section className="creator" ref={sectionRef}>
      <motion.div
        className="creator__container"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
        }}
      >
        <motion.div className="creator__image-wrapper" variants={imageFromLeft}>
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
        </motion.div>
        
        <motion.div className="creator__content" variants={contentFromRight}>
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
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Creator
