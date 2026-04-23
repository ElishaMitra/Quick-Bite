import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import PlaceOrder from "./components/PlaceOrder/PlaceOrder";
import Menu from "./components/Menu/Menu";
import Footer from "./components/Footer/Footer";
import AppDownload from "./components/Appdownload/AppDownload";
import Login from "./components/Login/Login";
import { useState } from "react";
import AdminLogin from "./components/Admin/AdminLogin";
import Verify from "./components/Verify/Verify";
import MyOrder from "./components/MyOrders/MyOrder";



function App() {
  const [showLogin, setShowLogin] = useState(false);
 
  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}

      <div className="App">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path='/admin' element={<AdminLogin />}/> 
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify"element={<Verify/>}/>
          <Route path="/myorders"element={<MyOrder/>}/>
        
        </Routes>
      </div>
      <AppDownload />
      <Footer />
    </>
  );
}

export default App;
