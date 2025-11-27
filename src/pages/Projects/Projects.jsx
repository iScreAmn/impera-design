import StickyHeader from '../../components/StickyHeader/StickyHeader';
import { logo } from '../../assets/images';
import ProjectsCollage from '../../components/ProjectsCollage/ProjectsCollage';
import './Projects.css';

function Projects() {
  return (
    <div className="projects-page">
      <StickyHeader />
      <div className="projects-content">
        <img src={logo} alt="KPI Studios" className="projects-logo" />
        <h1 className="projects-title">Реализованные проекты Impera Studio</h1>
        <p className="projects-subtitle">Наши работы говорят сами за себя</p>
        
        <ProjectsCollage />
      </div>
    </div>
  );
}

export default Projects;

