import { useEffect, useMemo, useRef, useState } from 'react';
import { FaChevronDown, FaTelegramPlane } from 'react-icons/fa';
import { CiMail } from 'react-icons/ci';
import Modal from '../Modals/Modal';
import { footerData } from '../../../data/footerData';
import { submitQuestion } from './questionApi';
import './QuestionModal.css';

const createInitialFormData = () => ({
  name: '',
  contactMethod: '',
  question: '',
  _company: ''
});

const QuestionModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState(createInitialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: 'idle', message: '' });
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false);
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

  const isFormValid = formData.name.trim()
    && formData.contactMethod.trim()
    && formData.question.trim();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContactMethodSelect = (method) => {
    setFormData({ ...formData, contactMethod: method.value });
    setIsContactDropdownOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;
    setIsSubmitting(true);
    setSubmitStatus({ type: 'idle', message: '' });

    try {
      const { _company, ...payload } = formData;
      await submitQuestion({ ...payload, _company });
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
          className="question-modal__input"
        />
        <div className="question-modal__dropdown-wrapper" ref={contactDropdownRef}>
          <button
            type="button"
            onClick={() => setIsContactDropdownOpen(!isContactDropdownOpen)}
            className={`question-modal__dropdown-button ${isContactDropdownOpen ? 'active' : ''} ${formData.contactMethod ? 'selected' : ''}`}
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
        <textarea
          name="question"
          value={formData.question}
          onChange={handleChange}
          placeholder="Ваш вопрос..."
          className="question-modal__textarea"
          rows="4"
        />
        <button
          type="submit"
          className="question-modal__submit"
          disabled={!isFormValid || isSubmitting}
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
