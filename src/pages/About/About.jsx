import StickyHeader from '../../components/StickyHeader/StickyHeader';
import Breadcrumbs from '../../components/Widgets/Breadcrumbs/Breadcrumbs';
import { teamPhoto } from '../../assets/images';
import Statistic from './Statistic/Statistic';
import History from './History/History';
import Mission from './Mission/Mission';
import Partners from './Partners/Partners';
import AboutCta from './AboutCta/AboutCta';
import Footer from '../../components/Footer/Footer';
import './About.css';

function About() {
  return (
    <div className="about-page">
      <StickyHeader />
      <div className="about-breadcrumbs">
        <div className="about-breadcrumbs__container">
          <Breadcrumbs />
        </div>
      </div>
      <div className="about-team-photo">
        <img src={teamPhoto} alt="Команда" className="about-team-photo__img" />
      </div>
      <History />
      <Statistic />
      <Mission />
      <Partners />
      <AboutCta />
      <Footer />
    </div>
  );
}

export default About;
