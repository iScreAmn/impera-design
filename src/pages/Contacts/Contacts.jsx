import StickyHeader from '../../components/StickyHeader/StickyHeader';
import { logo } from '../../assets/images';
import './Contacts.css';

function Contacts() {
  return (
    <div className="contacts-page">
      <StickyHeader />
      <div className="contacts-content">
        <img src={logo} alt="KPI Studios" className="contacts-logo" />
        <h1>Контакты</h1>
      </div>
    </div>
  );
}

export default Contacts;

