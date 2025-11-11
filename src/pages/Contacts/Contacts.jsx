import Header from '../../components/Header/Header';
import Navigation from '../../components/Navigation/Navigation';
import { logo } from '../../assets/images';
import './Contacts.css';

function Contacts() {
  return (
    <div className="contacts-page">
      <Header />
      <Navigation />
      <div className="contacts-content">
        <img src={logo} alt="KPI Studios" className="contacts-logo" />
        <h1>Контакты</h1>
      </div>
    </div>
  );
}

export default Contacts;

