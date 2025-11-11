import Header from '../../components/Header/Header';
import Navigation from '../../components/Navigation/Navigation';
import { logo } from '../../assets/images';
import './Clients.css';

function Clients() {
  return (
    <div className="clients-page">
      <Header />
      <Navigation />
      <div className="clients-content">
        <img src={logo} alt="KPI Studios" className="clients-logo" />
        <h1>Наши клиенты</h1>
      </div>
    </div>
  );
}

export default Clients;

