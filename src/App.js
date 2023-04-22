import logo from './logo.svg';
import './App.css';

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Search from './pages/Search';
import Login from './pages/Login';

function App() {
  return (
    <Router>

      <Navigation />
      {/* <Home /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
