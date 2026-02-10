import StickyHeader from '../../components/StickyHeader/StickyHeader';
import Breadcrumbs from '../../components/Widgets/Breadcrumbs/Breadcrumbs';
import Footer from '../../components/Footer/Footer';
import { confidentialData } from '../../data/confidentialData';
import './Terms.css';

function Terms() {
  const { terms } = confidentialData;

  const renderContent = (section) => {
    return (
      <div key={section.id} className="terms__section">
        {section.title && <h2 className="terms__section-title">{section.title}</h2>}
        
        {section.content && (
          <p className="terms__text" dangerouslySetInnerHTML={{ __html: section.content }} />
        )}
        
        {section.items && (
          <ul className="terms__list">
            {section.items.map((item, idx) => (
              <li key={idx} className="terms__list-item" dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        )}
        
        {section.subsections && section.subsections.map((sub, idx) => (
          <div key={idx} className="terms__subsection">
            {sub.subtitle && <h3 className="terms__subsection-title">{sub.subtitle}</h3>}
            {sub.content && <p className="terms__text" dangerouslySetInnerHTML={{ __html: sub.content }} />}
            {sub.items && (
              <ul className="terms__list">
                {sub.items.map((item, i) => (
                  <li key={i} className="terms__list-item" dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
            )}
          </div>
        ))}
        
        {section.note && (
          <p className="terms__note" dangerouslySetInnerHTML={{ __html: section.note }} />
        )}
      </div>
    );
  };

  return (
    <div className="terms-page">
      <StickyHeader />
      <div className="terms__breadcrumbs">
        <div className="terms__breadcrumbs-container">
          <Breadcrumbs />
        </div>
      </div>
      
      <div className="terms__container">
        <div className="terms__content">
          <h1 className="terms__title">{terms.title}</h1>
          {terms.sections.map(renderContent)}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Terms;
