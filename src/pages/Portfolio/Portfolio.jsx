import StickyHeader from '../../components/StickyHeader/StickyHeader';
import Footer from '../../components/Footer/Footer';
import { logo } from '../../assets/images';
import './Portfolio.css';

function Portfolio() {
  return (
    <div className="portfolio-page">
      <StickyHeader />
      <div className="portfolio-content">
        <img src={logo} alt="KPI Studios" className="portfolio-logo" />
        <h1>Портфолио</h1>
      </div>
      <Footer />
    </div>
  );
}

export default Portfolio;

