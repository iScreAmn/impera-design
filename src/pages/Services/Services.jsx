import Header from '../../components/Header/Header';
import Navigation from '../../components/Navigation/Navigation';
import { logo } from '../../assets/images';
import './Services.css';

function Services() {
  return (
    <div className="services-page">
      <Header />
      <Navigation />
      <div className="services-content">
        <img src={logo} alt="KPI Studios" className="services-logo" />
        <h1>Услуги</h1>
      </div>
    </div>
  );
}

export default Services;

