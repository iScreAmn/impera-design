import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import StickyHeader from '../StickyHeader/StickyHeader';
import Hero from '../Hero/Hero';
import Calculator from '../Calculator/Calculator';
import ProjectsCollage from '../ProjectsCollage/ProjectsCollage';
import ServicesSection from '../ServicesSection/ServicesSection';
import Advantage from '../Advantage/Advantage';
import Creator from '../Creator/Creator';
import CTA from '../CTA/CTA';
import Footer from '../Footer/Footer';
import { calculatorData } from '../../data/calculatorData';
import { aboutData } from '../../data/aboutData';
import { ctaData } from '../../data/ctaData';
import { projectsPageData } from '../../data/projectsData';
import './Home.css';

const projectsItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

function Home() {
  const projectsRef = useRef(null);
  const isProjectsInView = useInView(projectsRef, { once: true, amount: 0.12 });

  return (
    <div className="home">
      <StickyHeader />
      <Hero />
      <Calculator {...calculatorData} />
      <motion.section
        ref={projectsRef}
        className="home__projects"
        initial="hidden"
        animate={isProjectsInView ? 'visible' : 'hidden'}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
        }}
      >
        <motion.div
          className="home__projects-header"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0 } },
          }}
        >
          <motion.h2 className="home__projects-title" variants={projectsItem}>
            {projectsPageData.homeTitle}
          </motion.h2>
          <motion.p className="home__projects-subtitle" variants={projectsItem}>
            Наши работы говорят сами за себя
          </motion.p>
        </motion.div>
        <motion.div variants={projectsItem}>
          <ProjectsCollage limit={4} />
        </motion.div>
        <motion.div className="home__projects-footer" variants={projectsItem}>
          <Link to="/projects" className="home__projects-button">
            Посмотреть портфолио
          </Link>
        </motion.div>
      </motion.section>
      <ServicesSection />
      <Advantage />
      <Creator {...aboutData} />
      <CTA {...ctaData} />
      <Footer />
    </div>
  );
}

export default Home;

