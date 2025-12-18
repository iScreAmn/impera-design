import StickyHeader from '../../components/StickyHeader/StickyHeader';
import Breadcrumbs from '../../components/Widgets/Breadcrumbs/Breadcrumbs';
import Footer from '../../components/Footer/Footer';
import { logo } from '../../assets/images';
import ProjectsCollage from '../../components/ProjectsCollage/ProjectsCollage';
import './Projects.css';

function Projects() {
  return (
    <div className="projects-page">
      <StickyHeader />
      <div className="projects-breadcrumbs">
        <div className="projects-breadcrumbs__container">
          <Breadcrumbs />
        </div>
      </div>
      <div className="projects-content">
        <img src={logo} alt="KPI Studios" className="projects-logo" />
        <h1 className="projects-title">Реализованные проекты Impera Studio</h1>
        <p className="projects-subtitle">Наши работы говорят сами за себя</p>
        
        <ProjectsCollage />
      </div>
      <Footer />
    </div>
  );
}

export default Projects;

