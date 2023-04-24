import logo from './logo.svg';
import './App.css';

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Search from './pages/Search';
import Login from './pages/Login';
import Admin from './pages/Admin';
import RejectedTransactions from './pages/RejectedTransactions';
import Updata_Product_Price from './pages/Updata_Product_Price';

function App() {
  return (
    <Router>

      <Navigation />
      {/* <Home /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/rejectedTransactions" element={<RejectedTransactions />} />
        <Route path="/updateProductprice" element={<Updata_Product_Price />} />
      </Routes>
    </Router>
  );
}

export default App;
