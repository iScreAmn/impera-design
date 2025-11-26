import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Hero from '../Hero/Hero';
import Calculator from '../Calculator/Calculator';
import ProjectsCollage from '../ProjectsCollage/ProjectsCollage';
import ServicesSection from '../ServicesSection/ServicesSection';
import Advantage from '../Advantage/Advantage';
import Creator from '../Creator/Creator';
import CTA from '../CTA/CTA';
import { calculatorData } from '../../data/calculatorData';
import { aboutData } from '../../data/aboutData';
import { ctaData } from '../../data/ctaData';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <Header />
      <Navigation />
      <Hero />
      <Calculator {...calculatorData} />
      <section className="home__projects">
        <div className="home__projects-header">
          <h2 className="home__projects-title">Реализованные проекты Impera Studio</h2>
          <p className="home__projects-subtitle">Наши работы говорят сами за себя</p>
        </div>
        <ProjectsCollage />
      </section>
      <ServicesSection />
      <Advantage />
      <Creator {...aboutData} />
      <CTA {...ctaData} />
    </div>
  );
}

export default Home;

