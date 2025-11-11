import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Hero from '../Hero/Hero';
import Calculator from '../Calculator/Calculator';
import { calculatorData } from '../../data/calculatorData';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <Header />
      <Navigation />
      <Hero />
      <Calculator {...calculatorData} />
    </div>
  );
}

export default Home;

