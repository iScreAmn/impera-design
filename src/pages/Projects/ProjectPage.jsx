import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Navigation from '../../components/Navigation/Navigation';
import { projectsData } from '../../data/projectsData';
import './ProjectPage.css';

function ProjectPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projectsData.find((p) => p.slug === slug);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) {
    return (
      <div className="project-page">
        <Header />
        <Navigation />
        <div className="project-not-found">
          <h2>Проект не найден</h2>
          <button onClick={() => navigate('/projects')}>Вернуться к проектам</button>
        </div>
      </div>
    );
  }

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') nextImage(e);
    if (e.key === 'ArrowLeft') prevImage(e);
    if (e.key === 'Escape') closeModal();
  };

  return (
    <div className="project-page">
      <Header />
      <Navigation />
      
      <div className="project-container">
        <div className="project-header">
          <button className="project-back" onClick={() => navigate('/projects')}>
            ← Вернуться к проектам
          </button>
        </div>

        <div className="project">
          <div className="project__content">
            <div className="project__info">
              <h1 className="project__title">{project.title}</h1>
              
              <div className="project__description">
                <p>{project.description}</p>
              </div>

              <div className="project__characteristics">
                <h3 className="project__subtitle">Характеристики проекта:</h3>
                <ul className="project__list">
                  <li><strong>Студия:</strong> {project.studio}</li>
                  <li><strong>Площадь:</strong> {project.area} м²</li>
                  <li><strong>Тип проекта:</strong> {project.type}</li>
                  <li><strong>Дизайнер:</strong> {project.designer}</li>
                  <li><strong>Локация:</strong> {project.location}</li>
                  <li><strong>Дата реализации:</strong> {project.date}</li>
                </ul>

                {project.features && (
                  <>
                    <h3 className="project__subtitle">Особенности:</h3>
                    <ul className="project__features">
                      {project.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>

            <div className="project__gallery-wrapper">
              <div className="project__gallery">
                {project.images.map((image, index) => (
                  <div
                    key={index}
                    className="project-gallery__item"
                    onClick={() => openModal(index)}
                  >
                    <img
                      src={image}
                      alt={`${project.title} - изображение ${index + 1}`}
                      className="project-gallery__img"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div
          className="project-modal"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="project-modal__close"
            onClick={closeModal}
            aria-label="Закрыть"
          >
            ✕
          </button>
          
          <button
            className="project-modal__nav project-modal__nav--prev"
            onClick={prevImage}
            aria-label="Предыдущее изображение"
          >
            ‹
          </button>
          
          <img
            src={project.images[currentImageIndex]}
            alt={`${project.title} - изображение ${currentImageIndex + 1}`}
            className="project-modal__img"
            onClick={(e) => e.stopPropagation()}
          />
          
          <button
            className="project-modal__nav project-modal__nav--next"
            onClick={nextImage}
            aria-label="Следующее изображение"
          >
            ›
          </button>

          <div className="project-modal__counter">
            {currentImageIndex + 1} / {project.images.length}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectPage;
