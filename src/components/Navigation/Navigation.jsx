import { Link, useLocation } from 'react-router-dom';
import { navigationItems } from '../../data/navigationData';
import './Navigation.css';

function Navigation() {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="navigation__container">
        <ul className="navigation__list">
          {navigationItems.map((item) => (
            <li key={item.path} className="navigation__item">
              <Link
                to={item.path}
                className={`navigation__link ${
                  location.pathname === item.path ? 'navigation__link--active' : ''
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;

