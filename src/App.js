import logo from './logo.svg';
import './App.css';

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Search from './pages/Search';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Admin from './pages/Admin';
import RejectedTransactions from './pages/RejectedTransactions';

function App() {
  return (
    <Router>

      <Navigation />
      {/* <Home /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/rejectedTransactions" element={<RejectedTransactions />} />
      </Routes>
    </Router>
  );
}

export default App;
