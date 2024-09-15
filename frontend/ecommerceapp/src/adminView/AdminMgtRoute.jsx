import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Citymgt from './CityMgt';
import StateMgt from './StateMgt';
import ProductMgt from './ProductMgt';
import Usermgt from '../adminView/usermgt';

export default function AdminMgtRoute() {
  return (
    <>
      <nav>
        <ul>
          <li><Link to="citymgt">City Management</Link></li>
          <li><Link to="statemgt">State Management</Link></li>
          <li><Link to="productmgt">Product Management</Link></li>
          <li><Link to="usermgt">User Management</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/citymgt/*" element={<Citymgt />} />
        <Route path="/statemgt/*" element={<StateMgt />} />
        <Route path="/productmgt/*" element={<ProductMgt />} />
        <Route path="/usermgt/*" element={<Usermgt />} />
      </Routes>
    </>
  );
}
