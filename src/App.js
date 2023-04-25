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
import Updata_Product_Price from './pages/Updata_Product_Price';
import PurchaseProduct from './pages/PurchaseProduct';
import Customer from './pages/Customer';
import Sample from './pages/Sample';
import OrderHistory from './pages/OrderHistory';
import SellerInventory from './pages/SellerInventory';

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
        <Route path="/customer" element={<Customer />} />
        <Route path="/rejectedTransactions" element={<RejectedTransactions />} />
        <Route path="/updateProductprice" element={<Updata_Product_Price />} />
        <Route path="/purchaseProduct" element={<PurchaseProduct />} />
        <Route path="/sample" element={<Sample />} />
        <Route path="/orderHistory" element={<OrderHistory />} />
        <Route path="/sellerInventory" element={<SellerInventory />} />
      </Routes>
    </Router>
  );
}

export default App;
