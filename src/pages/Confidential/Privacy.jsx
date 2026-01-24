import StickyHeader from '../../components/StickyHeader/StickyHeader';
import Breadcrumbs from '../../components/Widgets/Breadcrumbs/Breadcrumbs';
import Footer from '../../components/Footer/Footer';
import { confidentialData } from '../../data/confidentialData';
import './Privacy.css';

function Privacy() {
  const { privacy } = confidentialData;

  const renderContent = (section) => {
    return (
      <div key={section.id} className="privacy__section">
        {section.title && <h2 className="privacy__section-title">{section.title}</h2>}
        
        {section.content && (
          <p className="privacy__text" dangerouslySetInnerHTML={{ __html: section.content }} />
        )}
        
        {section.items && (
          <ul className="privacy__list">
            {section.items.map((item, idx) => (
              <li key={idx} className="privacy__list-item" dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        )}
        
        {section.subsections && section.subsections.map((sub, idx) => (
          <div key={idx} className="privacy__subsection">
            {sub.subtitle && <h3 className="privacy__subsection-title">{sub.subtitle}</h3>}
            {sub.content && <p className="privacy__text" dangerouslySetInnerHTML={{ __html: sub.content }} />}
            {sub.items && (
              <ul className="privacy__list">
                {sub.items.map((item, i) => (
                  <li key={i} className="privacy__list-item" dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
            )}
          </div>
        ))}
        
        {section.note && (
          <p className="privacy__note" dangerouslySetInnerHTML={{ __html: section.note }} />
        )}
      </div>
    );
  };

  return (
    <div className="privacy-page">
      <StickyHeader />
      <div className="privacy__breadcrumbs">
        <div className="privacy__breadcrumbs-container">
          <Breadcrumbs />
        </div>
      </div>
      
      <div className="privacy__container">
        <div className="privacy__content">
          <h1 className="privacy__title">{privacy.title}</h1>
          {privacy.sections.map(renderContent)}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Privacy;
