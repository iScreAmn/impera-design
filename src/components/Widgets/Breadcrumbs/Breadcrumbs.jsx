import { Link, useLocation, useParams } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { projectsData } from '../../../data/projectsData';
import './Breadcrumbs.css';

// Маппинг путей к названиям страниц
const routeLabels = {
  '/': 'Главная',
  '/about': 'О компании',
  '/services': 'Услуги',
  '/portfolio': 'Портфолио',
  '/projects': 'Реализованные проекты',
  '/clients': 'Наши клиенты',
  '/stages': 'Этапы работ',
  '/contacts': 'Контакты',
};

function Breadcrumbs() {
  const location = useLocation();
  const params = useParams();
  
  // Генерация крошек на основе текущего пути
  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [];
    
    // Всегда добавляем главную страницу
    breadcrumbs.push({
      label: 'Главная',
      path: '/',
      isHome: true,
    });
    
    // Если мы на главной, возвращаем только home
    if (pathSegments.length === 0) {
      return breadcrumbs;
    }
    
    // Строим путь постепенно
    let currentPath = '';
    
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      // Проверяем, есть ли это в навигации
      let label = routeLabels[currentPath];
      
      // Обработка динамических маршрутов (например, /projects/:slug)
      if (!label && params.slug && segment === params.slug) {
        // Ищем проект по slug
        const project = projectsData.find((p) => p.slug === params.slug);
        label = project?.title || segment;
      }
      
      // Если всё ещё нет label, используем сегмент с заглавной буквы
      if (!label) {
        label = segment.charAt(0).toUpperCase() + segment.slice(1);
      }
      
      breadcrumbs.push({
        label,
        path: currentPath,
        isLast,
      });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbs = generateBreadcrumbs();
  
  // Если только главная страница, не показываем breadcrumbs
  if (breadcrumbs.length <= 1) {
    return null;
  }
  
  return (
    <nav className="breadcrumbs" aria-label="Навигация по страницам">
      <ul className="breadcrumbs__list">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          
          return (
            <li key={crumb.path} className="breadcrumbs__item">
              {!isLast ? (
                <>
                  <Link 
                    to={crumb.path} 
                    className={`breadcrumbs__link ${crumb.isHome ? 'breadcrumbs__link--home' : ''}`}
                  >
                    {crumb.isHome && (
                      <FiHome className="breadcrumbs__icon" aria-hidden="true" />
                    )}
                    <span className="breadcrumbs__text">{crumb.label}</span>
                  </Link>
                  <MdKeyboardArrowRight className="breadcrumbs__separator" aria-hidden="true" />
                </>
              ) : (
                <span className="breadcrumbs__current" aria-current="page">
                  {crumb.label}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Breadcrumbs;

