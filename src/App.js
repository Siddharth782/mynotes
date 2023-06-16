import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/noteState';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path='/' Component={Home} />
            <Route exact path='/about' Component={About} />
            <Route exact path='/login' Component={Login} />
            <Route exact path='/signup' Component={SignUp} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
