import React from 'react';
import CustomerReg from './CustomerReg';
import CustomerLogin from './CustomerLogin';
import { Route, Routes, Link } from 'react-router-dom';
import CustomerPic from '../Images/loginlogo.jpg';
import './customer.css'
function CustomerRoutes() {
    return (
        <>
            <div className="container">
                <img src={CustomerPic} alt="" height={300} width={1000} />
            </div>
            <nav>
                <ul>
                    <li><Link to="/CustomerReg">Register</Link></li>
                    <li><Link to="/CustomerLogin">Login</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/CustomerReg" element={<CustomerReg />} />
                <Route path="/CustomerLogin" element={<CustomerLogin />} />
            </Routes>
        </>
    )
}
export default CustomerRoutes;
