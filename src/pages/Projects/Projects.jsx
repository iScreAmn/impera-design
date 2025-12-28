import { Link } from 'react-router-dom';
import StickyHeader from '../../components/StickyHeader/StickyHeader';
import Breadcrumbs from '../../components/Widgets/Breadcrumbs/Breadcrumbs';
import Footer from '../../components/Footer/Footer';
import ProjectsCollage from '../../components/ProjectsCollage/ProjectsCollage';
import './Projects.css';

function Projects() {
  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const projectsSection = document.getElementById('projects-collage');
    if (projectsSection) {
      const headerHeight = 130; // Высота sticky header
      const elementPosition = projectsSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="projects-page">
      <StickyHeader />

      <div className="projects-breadcrumbs">
        <div className="projects-breadcrumbs__container">
          <Breadcrumbs />
        </div>
      </div>

      <section className="projects-hero">
        <div className="projects-hero__container">
          <div className="projects-hero__header">
            <h1 className="projects-hero__title">Проекты Impera Studio</h1>
            <p className="projects-hero__subtitle">
              Дизайн, который усиливает бренды: кафе и рестораны, бары и клубы, офисы, спа-комплексы. Чёткая концепция, продуманная эргономика и премиальный
              опыт для ваших гостей и команды
            </p>
          </div>

          <div className="projects-hero__actions">
            <Link to="/contacts" className="projects-hero__btn projects-hero__btn--primary">
              Обсудить проект
            </Link>
            <a 
              href="#projects-collage" 
              className="projects-hero__btn projects-hero__btn--ghost"
              onClick={handleScrollToProjects}
            >
              Смотреть кейсы
            </a>
          </div>
        </div>
      </section>

      <section className="projects-list">
        <div className="projects-content">
          <ProjectsCollage />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Projects;

