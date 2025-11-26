import React, { useState } from 'react'
import './CTA.css'

const CTA = ({ backgroundImage, title, checklistItems, person, form }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    agree: false
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <section className="cta">
      <div className="cta__bg" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="cta__overlay"></div>
      </div>
      
      <div className="cta__container">
        <div className="cta__left">
          <div className="cta__checklist">
            <h2 className="cta__title">{title}</h2>
            <ul className="cta__list">
              {checklistItems.map((item, index) => (
                <li key={index} className="cta__list-item">
                  <span className="cta__check">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          
        </div>

        <div className="cta__content">
          <form className="cta__form" onSubmit={handleSubmit}>
            <h3 className="cta__form-title">
              {form.title} <span className="cta__form-subtitle">{form.subtitle}</span>
            </h3>
            
            <div className="cta__form-group">
              <label htmlFor="name" className="cta__label">
                {form.nameLabel} <span className="cta__required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={form.namePlaceholder}
                className="cta__input"
                required
              />
            </div>

            <div className="cta__form-group">
              <label htmlFor="phone" className="cta__label">
                {form.phoneLabel} <span className="cta__required">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={form.phonePlaceholder}
                className="cta__input"
                required
              />
            </div>

            <button type="submit" className="cta__button" disabled={!formData.agree}>
              {form.submitText}
            </button>

            <div className="cta__checkbox-wrapper">
              <input
                type="checkbox"
                id="agree"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="cta__checkbox"
              />
              <label htmlFor="agree" className="cta__checkbox-label">
                {form.privacyText}
              </label>
            </div>
          </form>
        </div>
      </div>
      <div className="cta__person">
            <img src={person.image} alt={`${person.name} - ${person.title}`} className="cta__person-img" />
            <div className="cta__person-info">
              <div className="cta__person-name">{person.name}</div>
              <div className="cta__person-title">{person.title}</div>
            </div>
          </div>
    </section>
  )
}

export default CTA