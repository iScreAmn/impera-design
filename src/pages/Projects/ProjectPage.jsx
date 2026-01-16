import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { IoIosClose } from 'react-icons/io';
import StickyHeader from '../../components/StickyHeader/StickyHeader';
import Breadcrumbs from '../../components/Widgets/Breadcrumbs/Breadcrumbs';
import Footer from '../../components/Footer/Footer';
import { projectsData } from '../../data/projectsData';
import './ProjectPage.css';

function ProjectPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projectsData.find((p) => p.slug === slug);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleScrollToGallery = (e) => {
    e.preventDefault();
    const target = document.getElementById('project-gallery');
    if (!target) return;
    const headerHeight = 130;
    const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!modalOpen || !project) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentImageIndex((prev) => 
          prev === 0 ? project.images.length - 1 : prev - 1
        );
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        setModalOpen(false);
        document.body.style.overflow = 'auto';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalOpen, project]);

  if (!project) {
    return (
      <div className="project-page">
        <StickyHeader />
        <div className="project-not-found">
          <h2>Проект не найден</h2>
          <button onClick={() => navigate('/projects')}>Вернуться к проектам</button>
        </div>
      </div>
    );
  }

  const nextImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }
    if (isRightSwipe) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? project.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="project-page">
      <StickyHeader />
      
      <div className="project-breadcrumbs">
        <div className="project-breadcrumbs__container">
          <Breadcrumbs />
        </div>
      </div>

      <section className="project-hero">
        <div className="project-hero__container">
          <div className="project-hero__content">
            <h1 className="project-hero__title">{project.title}</h1>
            <p className="project-hero__subtitle">{project.description}</p>

            <div className="project-hero__meta">
              {project.location && (
                <div className="project-hero__chip">{project.location}</div>
              )}
              {project.area && <div className="project-hero__chip">{project.area}</div>}
              {project.designer && <div className="project-hero__chip">{project.designer}</div>}
              {project.date && <div className="project-hero__chip">{project.date}</div>}
            </div>

            <div className="project-hero__actions">
              <button className="project-hero__btn project-hero__btn--primary" onClick={handleScrollToGallery}>
                Смотреть галерею
              </button>
              <button className="project-hero__btn project-hero__btn--ghost" onClick={() => navigate('/contacts')}>
                Обсудить проект
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="project-gallery" className="project-gallery-section">
        <div className="project-gallery__container">
          <div className="project__gallery">
            {project.images.map((image, index) => {
              const totalImages = project.images.length;
              const isLarge = index === 0 || index === totalImages - 1 || index % 3 === 0;
              const isFirstInPair = !isLarge && index % 3 === 1;

              if (isLarge) {
                return (
                  <div
                    key={index}
                    className="project-gallery__item project-gallery__item--small"
                    onClick={() => openModal(index)}
                  >
                    <img
                      src={image}
                      alt={`${project.title} - изображение ${index + 1}`}
                      className="project-gallery__img"
                    />
                  </div>
                );
              } else if (isFirstInPair) {
                const nextImage = project.images[index + 1];
                return (
                  <div key={`pair-${index}`} className="project-gallery__pair">
                    <div
                      className="project-gallery__item project-gallery__item--small"
                      onClick={() => openModal(index)}
                    >
                      <img
                        src={image}
                        alt={`${project.title} - изображение ${index + 1}`}
                        className="project-gallery__img"
                      />
                    </div>
                    {nextImage && (
                      <div
                        className="project-gallery__item project-gallery__item--small"
                        onClick={() => openModal(index + 1)}
                      >
                        <img
                          src={nextImage}
                          alt={`${project.title} - изображение ${index + 2}`}
                          className="project-gallery__img"
                        />
                      </div>
                    )}
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      </section>

      {modalOpen && (
        <div
          className="project-modal"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="project-modal__close"
            onClick={closeModal}
            aria-label="Закрыть"
          >
            <IoIosClose />
          </button>
          
          <button
            className="project-modal__nav project-modal__nav--prev"
            onClick={prevImage}
            aria-label="Предыдущее изображение"
          >
            <MdKeyboardArrowLeft />
          </button>
          
          <img
            src={project.images[currentImageIndex]}
            alt={`${project.title} - изображение ${currentImageIndex + 1}`}
            className="project-modal__img"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          />
          
          <button
            className="project-modal__nav project-modal__nav--next"
            onClick={nextImage}
            aria-label="Следующее изображение"
          >
            <MdKeyboardArrowRight />
          </button>

          <div className="project-modal__counter">
            {currentImageIndex + 1} / {project.images.length}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default ProjectPage;
