import Header from '../../components/Header/Header';
import Navigation from '../../components/Navigation/Navigation';
import { logo } from '../../assets/images';
import './Portfolio.css';

function Portfolio() {
  return (
    <div className="portfolio-page">
      <Header />
      <Navigation />
      <div className="portfolio-content">
        <img src={logo} alt="KPI Studios" className="portfolio-logo" />
        <h1>Портфолио</h1>
      </div>
    </div>
  );
}

export default Portfolio;

