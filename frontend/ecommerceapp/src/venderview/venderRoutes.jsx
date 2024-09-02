import React from 'react';
import VenderReg from './venderReg';
import VenderLogin from './venderLogin';
import { Route, Routes, Link } from 'react-router-dom';
import venderPic from '../Images/venderlogo.jpeg'
import './vender.css'
function VenderRoutes() {
    return (
        <>
            <div className="container">
                <img src={venderPic} alt="" height={300} width={1000} />
            </div>
            <nav>
                <ul>
                    <li><Link to="venderview/venderReg">Register</Link></li>
                    <li><Link to="venderview/venderLogin">Login</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="venderview/venderReg" element={<VenderReg />} />
                <Route path="venderview/venderLogin" element={<VenderLogin />} />
            </Routes>
        </>)
}
export default VenderRoutes;