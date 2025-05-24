import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Flowers from './pages/Flowers';
import AddFlower from './pages/AddFlower';
import Footer from './components/Footer'; 
import './components/navbar.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Flowers />} />
          <Route path="/add" element={<AddFlower />} />
        </Routes>
        <Footer /> 
      </div>
    </Router>
  );
}

export default App;
