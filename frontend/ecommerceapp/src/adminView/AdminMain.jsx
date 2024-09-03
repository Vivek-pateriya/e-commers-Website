import React from 'react';
import AdminReg from './AdminReg';
import AdminLogin from './AdminLogin';
import { Route, Routes, Link } from 'react-router-dom';
import AdminPic from '../Images/Adminpic.jpg'
// import './Admin.css'
function AdminRoutes() {
    return (
        <>
            <div id="root2">
                <div className="container" >
                    <img src={AdminPic} alt="" height={300} width={1000} />
                </div>
                <nav>
                    <ul>
                        <li><Link to="adminaeg">Register</Link></li>
                        <li><Link to="adminlogin">Login</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/adminreg/*" element={<AdminReg />} />
                    <Route path="/adminlogin/*" element={<AdminLogin />} />
                </Routes>
            </div>
        </>)
}
export default AdminRoutes;

