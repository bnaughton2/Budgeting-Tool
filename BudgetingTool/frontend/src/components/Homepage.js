import React from "react";
import { BrowserRouter as Router, Routes, Link, Route, Redirect } from "react-router-dom";
import Income from "./Income";
import Login from "./Login";
import Signup from "./Signup";
import Bill from "./Bill";
import Navbar from './Navbar';

function Homepage(){
    return(
        <Router>
            <div className="nav">
                <Navbar />
            </div>
            <Routes>
                <Route path='/' element={<p>Homepage</p>}></Route>
                <Route path='/income' element={<Income />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/signup' element={<Signup />}></Route>
                <Route path='/bill' element={<Bill />}></Route>
            </Routes>
        </Router>
    );
}

export default Homepage;