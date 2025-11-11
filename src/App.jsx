import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import Portfolio from './pages/Portfolio/Portfolio';
import Projects from './pages/Projects/Projects';
import Clients from './pages/Clients/Clients';
import Stages from './pages/Stages/Stages';
import Contacts from './pages/Contacts/Contacts';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/stages" element={<Stages />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </Router>
  );
}

export default App;
