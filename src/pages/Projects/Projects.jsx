import Header from '../../components/Header/Header';
import Navigation from '../../components/Navigation/Navigation';
import { logo } from '../../assets/images';
import './Projects.css';

function Projects() {
  return (
    <div className="projects-page">
      <Header />
      <Navigation />
      <div className="projects-content">
        <img src={logo} alt="KPI Studios" className="projects-logo" />
        <h1>Реализованные проекты</h1>
      </div>
    </div>
  );
}

export default Projects;

