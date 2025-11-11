import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Navigation from '../../components/Navigation/Navigation';
import { logo } from '../../assets/images';
import { projectsData } from '../../data/projectsData';
import './Projects.css';

function Projects() {
  const navigate = useNavigate();
  const [activeImages, setActiveImages] = useState(() =>
    projectsData.reduce((acc, project) => {
      acc[project.id] = 0;
      return acc;
    }, {})
  );

  const handleThumbActivate = (projectId, index) => {
    setActiveImages((prev) => ({ ...prev, [projectId]: index }));
  };

  const handleProjectClick = (slug) => {
    navigate(`/projects/${slug}`);
  };

  return (
    <div className="projects-page">
      <Header />
      <Navigation />
      <div className="projects-content">
        <img src={logo} alt="KPI Studios" className="projects-logo" />
        <h1 className="projects-title">Реализованные проекты Impera Studio</h1>
        <p className="projects-subtitle">Наши работы говорят сами за себя</p>
        
        <div className="projects-collage">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="projects-collage__item"
              onClick={() => handleProjectClick(project.slug)}
            >
              <div className="projects-collage__main">
                <img
                  src={project.images[activeImages[project.id] || 0]}
                  alt={project.title}
                  className="projects-collage__img"
                />
              </div>
              
              <div className="projects-collage__thumbs">
                {project.thumbnails.map((thumb, index) => (
                  <div
                    key={index}
                    className="projects-collage__thumb-wrapper"
                    onMouseEnter={() => handleThumbActivate(project.id, index)}
                    onFocus={() => handleThumbActivate(project.id, index)}
                    onTouchStart={() => handleThumbActivate(project.id, index)}
                  >
                    <img
                      src={thumb}
                      alt={`${project.title} ${index + 1}`}
                      className="projects-collage__img projects-collage__img--thumb"
                    />
                  </div>
                ))}
                <div className="projects-collage__thumb-wrapper projects-collage__thumb-wrapper--cta">
                  <span className="projects-collage__cta">Смотреть проект</span>
                </div>
              </div>

              <div className="projects-collage__info">
                <h3 className="projects-collage__title">{project.title}</h3>
                <div className="projects-collage__meta">
                  <span className="projects-collage__location">
                    📍 {project.location}
                  </span>
                  <span className="projects-collage__date">
                    📅 {project.date}
                  </span>
                  <span className="projects-collage__area">
                    📐 {project.area}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;

