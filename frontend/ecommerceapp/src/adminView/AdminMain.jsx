import React from 'react';
import AdminReg from './AdminReg';
import AdminLogin from './AdminLogin';
import { Route, Routes, Link } from 'react-router-dom';
import AdminPic from '../Images/Adminpic.jpg'
// import './Admin.css'
function AdminRoutes() {
    return (
        <>
            <div className="container">
                <img src={AdminPic} alt="" height={300} width={1000} />
            </div>
            <nav>
                <ul>
                    <li><Link to="adminview/AdminReg">Register</Link></li>
                    <li><Link to="adminview/AdminLogin">Login</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="adminview/AdminReg" element={<AdminReg />} />
                <Route path="adminview/AdminLogin" element={<AdminLogin />} />
            </Routes>
        </>)
}
export default AdminRoutes;

