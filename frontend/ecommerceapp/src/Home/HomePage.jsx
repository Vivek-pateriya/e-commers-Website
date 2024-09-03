import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import AdminPic from '../Images/Homelogo.jpeg'
import AdminRoutes from '../adminView/AdminMain';
import CustomerRoutes from '../customer/customerMain'
import VenderRoutes from '../venderview/venderRoutes'
import NavBar from './NavBar';

// import './Admin.css'
function HomePage() {
  return (
    <>
      {/* <NavBar></NavBar> */}
      <div className="container">
        <img src={AdminPic} alt="" height={300} width={1000} />
      </div>
      <div>
        <nav>
          <ul>
            <li><li><Link to="/admin">Admin</Link></li></li>
            <li><Link to="/customer">Customer</Link></li>
            <li><Link to="/vender">Vender</Link></li>

          </ul>
        </nav>
        <Routes>
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/customer/*" element={<CustomerRoutes />} />
          <Route path="/vender/*" element={<VenderRoutes />} />

        </Routes>
      </div>
    </>)
}
export default HomePage;

