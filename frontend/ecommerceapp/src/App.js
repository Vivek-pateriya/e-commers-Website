import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router } from 'react-router-dom';
import StateMgt from './adminView/StateMgt';
import Citymgt from './adminView/CityMgt';
import ProducrMgt from './adminView/ProductMgt';
import Product from './productView/Product';
import ProductList from './productView/ProductList';
import CustomerHome from './customer/CustomerHome';
import CustomerLogin from './customer/CustomerLogin';
import CustomerRegister from './customer/CustomerReg';
import CustomerRoutes from './customer/customerMain';
import AdminRoutes from './adminView/AdminMain';
import HomePage from './Home/HomePage';
function App() {
  return (
    <div >
      {/* <StateMgt></StateMgt> */}
      {/* <Citymgt></Citymgt> */}
      {/* <ProducrMgt></ProducrMgt> */}
      {/* <Product></Product> */}
      {/* <ProductList></ProductList> */}
      {/* <CustomerRegister></CustomerRegister> */}
      <Router>
        {/* <CustomerRoutes></CustomerRoutes> */}
        {/* <AdminRoutes></AdminRoutes> */}
        <HomePage></HomePage>
      </Router>

    </div>
  );
}

export default App;
