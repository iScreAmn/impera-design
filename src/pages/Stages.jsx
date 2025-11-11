import Header from '../components/Header/Header';
import Navigation from '../components/Navigation/Navigation';
import { logo } from '../assets/images';

function Stages() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1a1a1a' }}>
      <Header />
      <Navigation />
      <div style={{ 
        padding: '80px 40px', 
        textAlign: 'center',
        color: '#fff'
      }}>
        <img src={logo} alt="KPI Studios" style={{ height: '100px', marginBottom: '20px' }} />
        <h1>Этапы работ</h1>
      </div>
    </div>
  );
}

export default Stages;

