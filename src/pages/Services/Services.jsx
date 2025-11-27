import StickyHeader from '../../components/StickyHeader/StickyHeader';
import { logo } from '../../assets/images';
import './Services.css';

function Services() {
  return (
    <div className="services-page">
      <StickyHeader />
      <div className="services-content">
        <img src={logo} alt="KPI Studios" className="services-logo" />
        <h1>Услуги</h1>
      </div>
    </div>
  );
}

export default Services;

