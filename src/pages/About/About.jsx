import Header from '../../components/Header/Header';
import Navigation from '../../components/Navigation/Navigation';
import { logo } from '../../assets/images';
import './About.css';

function About() {
  return (
    <div className="about-page">
      <Header />
      <Navigation />
      <div className="about-content">
        <img src={logo} alt="KPI Studios" className="about-logo" />
        <h1>О компании</h1>
      </div>
    </div>
  );
}

export default About;

