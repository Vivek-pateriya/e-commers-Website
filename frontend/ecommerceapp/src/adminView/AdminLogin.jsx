import axios from "axios";
import React, { useState } from "react";
import ReactDOM from 'react-dom/client';
// import { Router } from "react-router-dom";
// import { BrowserRouter as Router } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Usermgt from "./usermgt";
import AdminMgtRoute from "./AdminMgtRoute";

function AdminLogin() {
    const [AUSerId, setAUSerId] = useState("");
    const [AUserPass, setAUserPass] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
    const [userData, setUserData] = useState(null); // Store user data after login
    const handleAUSerId = (evt) => {
        setAUSerId(evt.target.value);
    };

    const handleAUserPass = (evt) => {
        setAUserPass(evt.target.value);
    };

    const handleLoginButton = () => {

        let obj = {
            AUSerId: AUSerId,
            AUserPass: AUserPass
        };
        console.log(obj);

        axios.post('http://localhost:9679/admin/login', obj)
            .then((res) => {
                console.log('Response from server:', res.data);
                if (res.data === 'Invalid ID or password' || res.data === 'Something went wrong') {
                    alert('Invalid ID or password & Login failed');
                } else {
                    alert('Login success');
                    const obj2 = {
                        Afname: res.data.AdminName,
                        Apicname: res.data.APicName,
                        Aid: res.data.Aid

                    };
                    console.log(obj2)
                    // const root = ReactDOM.createRoot(document.getElementById('root'));
                    // root.render(<Usermgt data={obj2} />);
                    // const root2 = ReactDOM.createRoot(document.getElementById('root2'));
                    // root2.render(
                    // <Router>
                    //     <Usermgt data={obj2} />
                    // </Router>
                    // );
                    setUserData(obj2);
                    setIsLoggedIn(true);
                }
            })
            .catch((error) => {
                console.error('Error during login:', error);
                alert('An error occurred during login. Please try again.');
            });
    };
    if (isLoggedIn && userData) {
        // Render the Usermgt component if logged in
        return (
            // <Router>
            //     <AdminMgtRoute data={userData} />
            // </Router>
            <AdminMgtRoute data={userData} />
        );
    }

    return (

        <div className="container" >
            <center>
                <h1>Login</h1>
                <table>
                    <tbody>
                        <tr>
                            <td>AUSerId</td>
                            <td><input type="text" value={AUSerId} onChange={handleAUSerId} /></td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td><input type="password" value={AUserPass} onChange={handleAUserPass} /></td>
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

export default AdminLogin;
