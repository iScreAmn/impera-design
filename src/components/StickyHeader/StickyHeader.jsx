import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import './StickyHeader.css';

function StickyHeader() {
  return (
    <div className="sticky-header">
      <Header />
      <Navigation />
    </div>
  );
}

export default StickyHeader;

