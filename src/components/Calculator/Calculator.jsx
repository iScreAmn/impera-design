import { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import PhoneInput from '../PhoneInput/PhoneInput';
import './Calculator.css';
import Modal from '../Widgets/Modals/Modal';
import { apiFetch } from '../../utils/api';

const Calculator = ({
  title,
  titleAccent,
  steps,
  contactMethods,
  consultant,
  bonuses,
  placeholders,
  buttons,
  contactConsent,
  progressTexts,
  contactQuestion,
  thankYouImage,
  thankYouAlt
}) => {
  const calculatorRef = useRef(null);
  const totalSteps = steps.length;
  const [currentStep, setCurrentStep] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const createInitialAnswers = () =>
    steps.reduce((acc, step) => {
      acc[step.field] = step.multiple ? [] : '';
      return acc;
    }, {});

  const createInitialFormData = () => ({
    name: '',
    phone: '',
    email: '',
    contactMethod: '',
    consent: false,
    _company: ''
  });

  const [answers, setAnswers] = useState(createInitialAnswers);
  
  const [formData, setFormData] = useState(createInitialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [highlightConsent, setHighlightConsent] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => setIsMobile(window.innerWidth <= 968);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleOptionClick = (option) => {
    if (currentStep > totalSteps) return;

    const step = steps[currentStep - 1];
    if (!step) return;
    
    if (step.multiple) {
      const current = answers[step.field];
      if (current.includes(option)) {
        setAnswers({
          ...answers,
          [step.field]: current.filter(item => item !== option)
        });
      } else {
        setAnswers({
          ...answers,
          [step.field]: [...current, option]
        });
      }
    } else {
      setAnswers({
        ...answers,
        [step.field]: option
      });
    }
  };

  const handleNext = () => {
    const step = steps[currentStep - 1];
    if (!step) return;

    const hasAnswer = step.multiple 
      ? answers[step.field].length > 0 
      : answers[step.field] !== '';
    
    if (hasAnswer) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        setCurrentStep(6);
      }
    }
  };

  const canGoNext = () => {
    if (currentStep > totalSteps) return false;
    const step = steps[currentStep - 1];
    if (!step) return false;
    return step.multiple 
      ? answers[step.field].length > 0 
      : answers[step.field] !== '';
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (name === 'consent' && checked) {
      setHighlightConsent(false);
    }
  }, []);

  const handleContactMethodClick = (method) => {
    setFormData({
      ...formData,
      contactMethod: method,
      email: method === 'email' ? formData.email : ''
    });

    if (isMobile && !isSubmitted && method) {
      setShowContactModal(true);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    if (!formData.consent) {
      setHighlightConsent(true);
      setTimeout(() => setHighlightConsent(false), 2000);
      return;
    }
    
    if (!canSubmit || isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError('');

    const { _company, ...contactPayload } = formData;
    const payload = {
      answers,
      contact: contactPayload,
      _company
    };

    try {
      const response = await apiFetch('/api/calculator/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Ошибка отправки заявки');
      }

      setIsSubmitted(true);
      setShowContactModal(false);
      if (isMobile) {
        setTimeout(() => calculatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    } catch (error) {
      setSubmitError(error.message || 'Ошибка отправки заявки');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = formData.name && formData.phone && formData.contactMethod && formData.consent;
  const showEmailInput = formData.contactMethod === 'email';

  const progress = Math.min(100, ((currentStep - 1) / totalSteps) * 100);

  const rightPanelMessage = currentStep <= totalSteps
    ? consultant.messages.default
    : consultant.messages.final;

  const currentStepData = useMemo(
    () => (currentStep <= totalSteps ? steps[currentStep - 1] : null),
    [currentStep, steps, totalSteps]
  );

  const handleRepeat = () => {
    setAnswers(createInitialAnswers());
    setFormData(createInitialFormData());
    setCurrentStep(1);
    setIsSubmitted(false);
    setShowContactModal(false);
    if (isMobile) {
      setTimeout(() => calculatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  };

  const handleCloseModal = useCallback(() => {
    setShowContactModal(false);
  }, []);

  const renderContactForm = (variant = 'default') => {
    const isModalVariant = variant === 'modal';
    const inputClass = isModalVariant ? 'calculator-modal__input' : 'calculator__input';
    const formClass = isModalVariant
      ? 'calculator-modal__form'
      : 'calculator__form';
    const submitClass = isModalVariant ? 'calculator-modal__submit' : 'calculator__submit';

    return (
      <form className={formClass} onSubmit={handleSubmit}>
      <input
        type="text"
        name="_company"
        value={formData._company}
        onChange={handleInputChange}
        tabIndex="-1"
        autoComplete="off"
        style={{ display: 'none' }}
      />
      <input
        type="text"
        name="name"
        className={inputClass}
        placeholder={placeholders.name}
        value={formData.name}
        onChange={handleInputChange}
        required
      />
      <PhoneInput
        value={formData.phone}
        onChange={(phone) => setFormData(prev => ({ ...prev, phone }))}
        placeholder={placeholders.phone}
        variant={isModalVariant ? 'modal' : 'default'}
      />

      {showEmailInput && (
        <input
          type="email"
          name="email"
          className={inputClass}
          placeholder={placeholders.email || 'Email'}
          value={formData.email}
          onChange={handleInputChange}
        />
      )}

      <button
        type="button"
        onClick={handleSubmit}
        className={`${submitClass} ${!canSubmit ? `${submitClass}--disabled` : ''}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Отправка...' : buttons.submit}
      </button>
      {submitError && (
        <p className="calculator__form-status" role="status">
          {submitError}
        </p>
      )}

      {isModalVariant ? (
        <label className="calculator-modal__checkbox-label">
          <div className="calculator-modal__checkbox-wrapper">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleInputChange}
              className="calculator__checkbox-input"
            />
            <span className={`calculator__checkbox-custom ${highlightConsent ? 'calculator__checkbox-custom--highlight' : ''}`} />
          </div>
          <span className="calculator-modal__checkbox-text">
            {contactConsent.text}{' '}
            <Link to={contactConsent.href} className="calculator__link">{contactConsent.linkText}</Link>
          </span>
        </label>
      ) : (
        <label className="calculator__checkbox-label">
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleInputChange}
            className="calculator__checkbox-input"
          />
          <span className={`calculator__checkbox-custom ${highlightConsent ? 'calculator__checkbox-custom--highlight' : ''}`} />
          {contactConsent.text}{' '}
          <Link to={contactConsent.href} className="calculator__link">{contactConsent.linkText}</Link>
        </label>
      )}
      </form>
    );
  };

  return (
    <div className="calculator" ref={calculatorRef}>
      <div className="calculator__header">
        <h2 className="calculator__title">
          {title} <span>{titleAccent}</span>
        </h2>
      </div>

      <div className="calculator__content">
        <div className="calculator__left">
          {currentStep <= totalSteps ? (
            <>
              {currentStep > 1 && (
                <div className="calculator__progress">
                  <div className="calculator__progress-text">{progressTexts.prefix} {Math.round(progress)}%</div>
                  <div className="calculator__progress-track">
                    <div
                      className="calculator__progress-bar"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="calculator__step calculator__step--active">
                <h3 className="calculator__question">{currentStepData?.question}</h3>
                
                {currentStepData?.subtitle && (
                  <p className="calculator__subtitle">{currentStepData.subtitle}</p>
                )}

                <div className="calculator__options">
                  {currentStepData?.options.map((option, index) => {
                    const isSelected = currentStepData.multiple 
                      ? answers[currentStepData.field].includes(option)
                      : answers[currentStepData.field] === option;

                    return (
                      <button
                        key={index}
                        className={`calculator__option ${isSelected ? 'calculator__option--selected' : ''}`}
                        onClick={() => handleOptionClick(option)}
                      >
                        {currentStepData.multiple && (
                          <span className={`calculator__checkbox ${isSelected ? 'calculator__checkbox--checked' : ''}`} />
                        )}
                        {option}
                      </button>
                    );
                  })}
                </div>

                <div className="calculator__navigation">
                  {currentStep > 1 && (
                    <button className="calculator__nav-btn calculator__nav-btn--back" onClick={handleBack}>
                      {buttons.back}
                    </button>
                  )}
                  
                  <button 
                    className={`calculator__nav-btn calculator__nav-btn--next ${!canGoNext() ? 'calculator__nav-btn--disabled' : ''}`}
                    onClick={handleNext}
                    disabled={!canGoNext()}
                  >
                    {buttons.next}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="calculator__final-content">
              <div className="calculator__progress-info">
                <div className="calculator__progress-text">{progressTexts.finalLabel}</div>
                <div className="calculator__progress-number">{Math.round(progress)}%</div>
              </div>
              <div className="calculator__progress-track calculator__progress-track--final">
                <div
                  className="calculator__progress-bar calculator__progress-bar--final"
                  style={{ width: '100%' }}
                />
              </div>

              {isSubmitted ? (
                <>
                  <h3 className="calculator__final-title">{progressTexts.submittedHeading}</h3>
                  <p className="calculator__final-subtitle">{progressTexts.submittedSubtitle}</p>
                </>
              ) : (
                <>
                  <h3 className="calculator__final-title">{progressTexts.finalHeading}</h3>
                  <p className="calculator__final-subtitle">
                    {progressTexts.finalSubtitle}
                  </p>
                </>
              )}

              {isSubmitted ? (
                <div className="calculator__thankyou">
                  <img src={thankYouImage} alt={thankYouAlt} className="calculator__thankyou-image" />
                  <button type="button" className="calculator__repeat" onClick={handleRepeat}>
                    {buttons.repeat}
                  </button>
                </div>
              ) : (
                <>
                  <p className="calculator__final-method">{contactQuestion}</p>

                  <div className="calculator__contact-methods">
                    {contactMethods.map((method) => {
                      const MethodIcon = method.icon;
                      return (
                        <button
                          key={method.id}
                          className={`calculator__contact-btn calculator__contact-btn--${method.id} ${formData.contactMethod === method.id ? 'calculator__contact-btn--active' : ''}`}
                          onClick={() => handleContactMethodClick(method.id)}
                          type="button"
                        >
                          {MethodIcon && (method.iconType === 'img' ? (
                            <img src={MethodIcon} alt="" className="calculator__contact-icon" aria-hidden />
                          ) : (
                            <MethodIcon className="calculator__contact-icon" />
                          ))}
                          {method.label}
                        </button>
                      );
                    })}
                  </div>

                  {!isMobile && formData.contactMethod && renderContactForm()}
                </>
              )}
            </div>
          )}
        </div>

        <div className="calculator__right">
          <div className="calculator__consultant">
            <img 
              src={consultant.photo} 
              alt={consultant.name} 
              className="calculator__consultant-photo"
            />
            <div className="calculator__consultant-info">
              <h4 className="calculator__consultant-name">{consultant.name}</h4>
              <p className="calculator__consultant-role">
                {consultant.role}
              </p>
            </div>
          </div>

          <div className="calculator__consultant-message">
            <p>{rightPanelMessage}</p>
          </div>

          <div className="calculator__bonuses">
            <h4 className="calculator__bonuses-title">В результате вы получите:</h4>
            <div className="calculator__bonus-items">
              {bonuses.map((bonus, index) => {
                const BonusIcon = bonus.icon;
                return (
                  <div className="calculator__bonus-item" key={index}>
                    {BonusIcon && <BonusIcon className="calculator__bonus-icon" />}
                    <span className="calculator__bonus-text">{bonus.text}</span>
                    <img src={bonus.image} alt={`Бонус ${index + 1}`} className="calculator__bonus-preview" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {isMobile && showContactModal && !isSubmitted && (
        <Modal
          isOpen={showContactModal}
          onClose={handleCloseModal}
          title={<span className="calculator-modal__title-text">Оставьте Ваши контакты</span>}
          className="calculator-contact-modal"
        >
          <p className="calculator-modal__subtitle">
            Мы свяжемся с Вами и направим расчет
          </p>
          {renderContactForm('modal')}
        </Modal>
      )}
    </div>
  );
};

export default Calculator;

