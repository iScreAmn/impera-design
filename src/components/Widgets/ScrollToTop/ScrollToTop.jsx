import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MdKeyboardArrowUp } from 'react-icons/md';
import './ScrollToTop.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  // Сброс скролла при смене маршрута
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Отслеживание скролла для показа кнопки
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className={`scroll-to-top-btn ${isVisible ? 'scroll-to-top-btn--visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Прокрутить вверх"
    >
      <MdKeyboardArrowUp />
    </button>
  );
}

export default ScrollToTop;

