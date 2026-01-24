import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/Widgets/ScrollToTop/ScrollToTop';
import CookieConsent from './components/Widgets/CookieConsent/CookieConsent';
import Home from './components/Home/Home';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import Projects from './pages/Projects/Projects';
import ProjectPage from './pages/Projects/ProjectPage';
import Clients from './pages/Clients/Clients';
import Stages from './pages/Stages/Stages';
import Contacts from './pages/Contacts/Contacts';
import Privacy from './pages/Confidential/Privacy';
import Terms from './pages/Confidential/Terms';

function TextoliteRedirect() {
  useEffect(() => {
    window.location.replace(window.location.pathname + window.location.search + window.location.hash);
  }, []);
  return null;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/textolite/*" element={<TextoliteRedirect />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/stages" element={<Stages />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      <ScrollToTop />
      <CookieConsent />
    </Router>
  );
}

export default App;
