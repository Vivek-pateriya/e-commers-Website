import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from './Home/HomePage';
function App() {
  return (
    <div >
      <Router>
        <HomePage></HomePage>
      </Router>
    </div>
  );
}

export default App;
