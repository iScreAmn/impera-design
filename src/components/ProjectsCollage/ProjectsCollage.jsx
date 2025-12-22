import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectsData } from '../../data/projectsData';
import './ProjectsCollage.css';

function ProjectsCollage({ onProjectClick, limit }) {
  const navigate = useNavigate();
  const displayedProjects = limit ? projectsData.slice(0, limit) : projectsData;
  const [activeImages, setActiveImages] = useState(() =>
    displayedProjects.reduce((acc, project) => {
      acc[project.id] = 0;
      return acc;
    }, {})
  );

  const handleThumbActivate = (projectId, index) => {
    setActiveImages((prev) => ({ ...prev, [projectId]: index }));
  };

  const handleProjectClick = (slug) => {
    if (onProjectClick) {
      onProjectClick(slug);
    } else {
      navigate(`/projects/${slug}`);
    }
  };

  return (
    <div id="projects-collage" className="projects-collage">
      {displayedProjects.map((project) => (
        <div
          key={project.id}
          className="projects-collage__item"
          onClick={() => handleProjectClick(project.slug)}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
              event.preventDefault();
              handleProjectClick(project.slug);
            }
          }}
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
              <span className="projects-collage__location">📍 {project.location}</span>
              <span className="projects-collage__date">📅 {project.date}</span>
              <span className="projects-collage__area">📐 {project.area}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectsCollage;
