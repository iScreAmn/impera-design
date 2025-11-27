import StickyHeader from '../../components/StickyHeader/StickyHeader';
import { logo } from '../../assets/images';
import './About.css';

function About() {
  return (
    <div className="about-page">
      <StickyHeader />
      <div className="about-content">
        <img src={logo} alt="KPI Studios" className="about-logo" />
        <h1>О компании</h1>
      </div>
    </div>
  );
}

export default About;
