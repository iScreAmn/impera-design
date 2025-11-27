import StickyHeader from '../../components/StickyHeader/StickyHeader';
import { logo } from '../../assets/images';
import './Stages.css';

function Stages() {
  return (
    <div className="stages-page">
      <StickyHeader />
      <div className="stages-content">
        <img src={logo} alt="KPI Studios" className="stages-logo" />
        <h1>Этапы работы</h1>
      </div>
    </div>
  );
}

export default Stages;

