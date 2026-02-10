import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaTelegramPlane } from 'react-icons/fa';
import { CiMail } from 'react-icons/ci';
import Modal from '../Modals/Modal';
import PhoneInput from '../../PhoneInput/PhoneInput';
import { footerData } from '../../../data/footerData';
import { calculatorData } from '../../../data/calculatorData';
import { submitQuestion } from './questionApi';
import './QuestionModal.css';

const createInitialFormData = () => ({
  name: '',
  contactMethod: '',
  contactValue: '',
  question: '',
  agree: false,
  _company: ''
});

const isPhoneValid = (v) => /^\+?[\d\s()-]{7,20}$/.test((v || '').replace(/\s/g, '')) && (v || '').replace(/\D/g, '').length >= 7;
const isEmailValid = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((v || '').trim());

const QuestionModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState(createInitialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: 'idle', message: '' });
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false);
  const [showFieldErrors, setShowFieldErrors] = useState(false);
  const contactDropdownRef = useRef(null);

  const contactMethods = useMemo(() => {
    const maxSocial = footerData.socials.find((item) => item.label === 'Max');
    return [
      { value: 'telegram', label: 'Telegram', icon: FaTelegramPlane },
      { value: 'max', label: 'Max', icon: maxSocial?.icon, iconType: maxSocial?.iconType },
      { value: 'email', label: 'Email', icon: CiMail }
    ];
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setIsContactDropdownOpen(false);
      setSubmitStatus({ type: 'idle', message: '' });
      setShowFieldErrors(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contactDropdownRef.current && !contactDropdownRef.current.contains(event.target)) {
        setIsContactDropdownOpen(false);
      }
    };

    if (isContactDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isContactDropdownOpen]);

  const contactValueValid = !formData.contactMethod
    ? false
    : (formData.contactMethod === 'email'
      ? isEmailValid(formData.contactValue)
      : isPhoneValid(formData.contactValue));
  const isFormValid = formData.name.trim()
    && formData.contactMethod.trim()
    && contactValueValid
    && formData.question.trim()
    && formData.agree;

  useEffect(() => {
    if (isFormValid && showFieldErrors) setShowFieldErrors(false);
  }, [isFormValid, showFieldErrors]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleContactMethodSelect = (method) => {
    setFormData({ ...formData, contactMethod: method.value, contactValue: '' });
    setIsContactDropdownOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      setShowFieldErrors(true);
      return;
    }
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitStatus({ type: 'idle', message: '' });

    try {
      const payload = {
        name: formData.name.trim(),
        contactMethod: formData.contactMethod,
        contactValue: formData.contactValue,
        question: formData.question.trim(),
        agree: formData.agree,
        _company: formData._company
      };
      await submitQuestion(payload);
      setSubmitStatus({
        type: 'success',
        message: 'Спасибо! Вопрос отправлен.'
      });
      setFormData(createInitialFormData());
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Ошибка отправки вопроса'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Задать вопрос"
      className="question-modal"
    >
      <p className="question-modal__subtitle">
        Задайте ваш вопрос, и мы ответим в ближайшее время
      </p>
      <form className="question-modal__form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="_company"
          value={formData._company}
          onChange={handleChange}
          tabIndex="-1"
          autoComplete="off"
          style={{ display: 'none' }}
        />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ваше имя"
          className={`question-modal__input${showFieldErrors && !formData.name.trim() ? ' question-modal__input--error' : ''}`}
        />
        <div className="question-modal__dropdown-wrapper" ref={contactDropdownRef}>
          <button
            type="button"
            onClick={() => setIsContactDropdownOpen(!isContactDropdownOpen)}
            className={`question-modal__dropdown-button ${isContactDropdownOpen ? 'active' : ''} ${formData.contactMethod ? 'selected' : ''}${showFieldErrors && !formData.contactMethod ? ' question-modal__dropdown-button--error' : ''}`}
          >
            <span className="question-modal__dropdown-button-text">
              {formData.contactMethod
                ? contactMethods.find((method) => method.value === formData.contactMethod)?.label
                : 'Способ связи для ответа'}
            </span>
            <FaChevronDown className="question-modal__dropdown-button-icon" />
          </button>
          {isContactDropdownOpen && (
            <div className="question-modal__dropdown">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.value}
                    type="button"
                    onClick={() => handleContactMethodSelect(method)}
                    className={`question-modal__dropdown-item ${formData.contactMethod === method.value ? 'active' : ''}`}
                  >
                    {method.iconType === 'img' ? (
                      <img src={Icon} alt="" className="question-modal__dropdown-icon question-modal__dropdown-icon--img" />
                    ) : (
                      Icon && <Icon className="question-modal__dropdown-icon" />
                    )}
                    <span className="question-modal__dropdown-text">{method.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
        {(formData.contactMethod === 'telegram' || formData.contactMethod === 'max') && (
          <PhoneInput
            value={formData.contactValue}
            onChange={(v) => setFormData((prev) => ({ ...prev, contactValue: v }))}
            placeholder="Ваш номер телефона"
            variant="modal"
            error={showFieldErrors && formData.contactMethod && !contactValueValid}
          />
        )}
        {formData.contactMethod === 'email' && (
          <input
            type="email"
            name="contactValue"
            value={formData.contactValue}
            onChange={handleChange}
            placeholder="Email"
            className={`question-modal__input${showFieldErrors && formData.contactMethod && !contactValueValid ? ' question-modal__input--error' : ''}`}
            autoComplete="email"
          />
        )}
        <textarea
          name="question"
          value={formData.question}
          onChange={handleChange}
          placeholder="Ваш вопрос..."
          className={`question-modal__textarea${showFieldErrors && !formData.question.trim() ? ' question-modal__textarea--error' : ''}`}
          rows="4"
        />
        <div
          className={`question-modal__checkbox-wrapper${showFieldErrors && !formData.agree ? ' question-modal__checkbox-wrapper--error' : ''}`}
        >
          <input
            type="checkbox"
            id="question-agree"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
            className="question-modal__checkbox"
          />
          <label htmlFor="question-agree" className="question-modal__checkbox-label">
            {calculatorData.contactConsent.text}{' '}
            <Link to={calculatorData.contactConsent.href} className="question-modal__checkbox-link">
              {calculatorData.contactConsent.linkText}
            </Link>
          </label>
        </div>
        <button
          type="submit"
          className={`question-modal__submit${!isFormValid && !isSubmitting ? ' question-modal__submit--invalid' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Отправка...' : 'Отправить'}
        </button>
        {submitStatus.type !== 'idle' && (
          <p
            className={`question-modal__status ${submitStatus.type === 'error' ? 'question-modal__status--error' : ''}`}
            role="status"
          >
            {submitStatus.message}
          </p>
        )}
      </form>
    </Modal>
  );
};

export default QuestionModal;
