import './App.css';
import { Routes, Route} from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import AppBar from "./components/App";
import BottomNav from './components/BottomNav';
import Recent from './components/Recent';
import Top from './components/Top';
import Popular from './components/Popular';
import Movie from './components/Movie';

function App() {
  return (
    <Router>
      <AppBar />
      <div style={{ paddingTop: '50px', paddingBottom: '60px' }}>
        <Routes>
          <Route path="/" element={<Recent />} />
          <Route path="/top" element={<Top />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/movie" element={<Movie />} />
        </Routes>
      </div>
      <BottomNav />
    </Router>
  );
}

export default App;
