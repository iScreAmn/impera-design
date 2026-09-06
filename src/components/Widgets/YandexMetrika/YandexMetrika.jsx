import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const METRIKA_ID = 107040172;

const YandexMetrika = () => {
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (typeof window.ym === 'function') {
      window.ym(METRIKA_ID, 'hit', window.location.href);
    }
  }, [location.pathname, location.search]);

  return null;
};

export default YandexMetrika;
