import Header from '../../components/Header/Header';
import Navigation from '../../components/Navigation/Navigation';
import { logo } from '../../assets/images';
import ProjectsCollage from '../../components/ProjectsCollage/ProjectsCollage';
import './Projects.css';

function Projects() {
  return (
    <div className="projects-page">
      <Header />
      <Navigation />
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

