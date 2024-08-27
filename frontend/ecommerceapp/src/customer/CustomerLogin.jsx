import axios from "axios";
import React, { useState } from "react";
import ReactDOM from 'react-dom/client';
import Home from "./CustomerHome";

function CustomerLogin() {
  const [userId, setUserId] = useState("");
  const [userPass, setUserPass] = useState("");

  const handleUserId = (evt) => {
    setUserId(evt.target.value);
  };

  const handleUserPass = (evt) => {
    setUserPass(evt.target.value);
  };

  const handleLoginButton = () => {
    const obj = {
      userId: userId,
      userPass: userPass
    };

    axios.post('http://localhost:9679/customer/login', obj)
      .then((res) => {
        console.log('Response from server:', res.data);
        if (res.data === 'Login failed') {
          alert('Login failed');
        } else {
          alert('Login success');
          const obj2 = {
            cfname: res.data.CustomerName,
            cpicname: res.data.CPicName,
            cid: res.data.Cid

          };

          const root = ReactDOM.createRoot(document.getElementById('root'));
          root.render(<Home data={obj2} />);
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        alert('An error occurred during login. Please try again.');
      });
  };

  return (
    <div className="container">
      <center>
        <h1>Login</h1>
        <table>
          <tbody>
            <tr>
              <td>UserId</td>
              <td><input type="text" value={userId} onChange={handleUserId} /></td>
            </tr>
            <tr>
              <td>Password</td>
              <td><input type="password" value={userPass} onChange={handleUserPass} /></td>
            </tr>
            <tr>
              <td></td>
              <td><button onClick={handleLoginButton}>Login</button></td>
            </tr>
          </tbody>
        </table>
      </center>
    </div>
  );
}

export default CustomerLogin;