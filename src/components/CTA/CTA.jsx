import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PhoneInput from '../PhoneInput/PhoneInput'
import { apiFetch } from '../../utils/api'
import './CTA.css'

const CTA = ({ backgroundImage, title, checklistItems, form }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    agree: false,
    _company: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ type: 'idle', message: '' })
  const [showValidationErrors, setShowValidationErrors] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    setShowValidationErrors(false)
  }

  const isPhoneValid = (v) => (v || '').startsWith('+') && (v || '').replace(/\D/g, '').length >= 7
  const isFormValid = formData.name.trim() && isPhoneValid(formData.phone) && formData.agree

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isFormValid) {
      setShowValidationErrors(true)
      return
    }
    if (isSubmitting) return
    setIsSubmitting(true)
    setSubmitStatus({ type: 'idle', message: '' })
    try {
      const res = await apiFetch('/api/cta/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone,
          agree: formData.agree,
          _company: formData._company
        })
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Ошибка отправки')
      }
      setSubmitStatus({ type: 'success', message: data.message || 'Заявка отправлена!' })
      setFormData({ name: '', phone: '', agree: false, _company: '' })
    } catch (err) {
      setSubmitStatus({ type: 'error', message: err.message || 'Ошибка отправки. Попробуйте позже.' })
    } finally {
      setIsSubmitting(false)
    }
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
            <input
              type="text"
              name="_company"
              value={formData._company}
              onChange={handleChange}
              tabIndex="-1"
              autoComplete="off"
              style={{ position: 'absolute', left: '-9999px' }}
              aria-hidden
            />
            <h3 className="cta__form-title">
              {form.title} <span className="cta__form-subtitle">{form.subtitle}</span>
            </h3>
            
            <div
              className={`cta__form-group ${showValidationErrors && !formData.name.trim() ? 'cta__form-group--invalid' : ''}`}
            >
              <label htmlFor="cta-name" className="cta__label">
                {form.nameLabel} <span className="cta__required">*</span>
              </label>
              <input
                type="text"
                id="cta-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={form.namePlaceholder}
                className="cta__input"
                required
              />
            </div>

            <div
              className={`cta__form-group ${showValidationErrors && !isPhoneValid(formData.phone) ? 'cta__form-group--invalid' : ''}`}
            >
              <label htmlFor="cta-phone" className="cta__label">
                {form.phoneLabel} <span className="cta__required">*</span>
              </label>
              <PhoneInput
                value={formData.phone}
                onChange={(v) => {
                  setFormData((prev) => ({ ...prev, phone: v }))
                  setShowValidationErrors(false)
                }}
                placeholder={form.phonePlaceholder}
                variant="default"
              />
            </div>

            <button
              type="submit"
              className={`cta__button ${!isFormValid ? 'cta__button--inactive' : ''}`}
              disabled={isSubmitting}
              aria-disabled={!isFormValid}
            >
              {isSubmitting ? 'Отправка...' : form.submitText}
            </button>

            {submitStatus.type !== 'idle' && (
              <p className={`cta__status ${submitStatus.type === 'error' ? 'cta__status--error' : ''}`} role="status">
                {submitStatus.message}
              </p>
            )}

            <div
              className={`cta__checkbox-wrapper ${showValidationErrors && !formData.agree ? 'cta__checkbox-wrapper--invalid' : ''}`}
            >
              <input
                type="checkbox"
                id="agree"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="cta__checkbox"
              />
              <label htmlFor="agree" className="cta__checkbox-label">
                {form.consent.text}{' '}
                <Link to={form.consent.href} className="cta__checkbox-link">
                  {form.consent.linkText}
                </Link>
              </label>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default CTA